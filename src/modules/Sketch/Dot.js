import getDistance from '@/utils/getDistance'

const T = 2 * Math.PI
let i = 0
let distance = 0

class Dot {
	constructor({ id, x, y, r, v, fill = '#000' }) {
		this.id = id
		this.x = x
		this.y = y
		this.r = r
		this.v = v
		this.fill = fill

		this.lines = {}

		this.bounds = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		}
		this.updateBounds()
	}

	checkCollision(W, H) {
		if (this.bounds.left <= 0 && this.v.x <= 0) this.v.x *= -1
		else if (this.bounds.right >= W && this.v.x >= 0) this.v.x *= -1

		if (this.bounds.top <= 0 && this.v.y <= 0) this.v.y *= -1
		else if (this.bounds.bottom >= H && this.v.y >= 0) this.v.y *= -1
	}

	updateBounds() {
		this.bounds.top = this.y - this.r
		this.bounds.right = this.x + this.r
		this.bounds.bottom = this.y + this.r
		this.bounds.left = this.x - this.r
	}

	link(dots, threshold) {
		for (i = 0; i < dots.length; i++) {
			if (dots[i].id === this.id) continue
			if (dots[i].lines[this.id]) continue

			distance = getDistance(this.x, this.y, dots[i].x, dots[i].y)

			if (distance <= threshold && distance >= this.r + dots[i].r)
				this.lines[dots[i].id] = {
					0: { x: this.x, y: this.y },
					1: { x: dots[i].x, y: dots[i].y },
					alpha: (threshold - distance) / (threshold / 2),
					width: Math.min((threshold / distance), Math.min(this.r, dots[i].r))
				}
			else delete this.lines[dots[i].id]
		}
	}

	update(ctx, W, H, dots, threshold) {
		this.checkCollision(W, H)

		this.x += this.v.x || 0
		this.y += this.v.y || 0

		this.updateBounds()
		this.link(dots, threshold)

		ctx.beginPath()
		ctx.fillStyle = this.fill
		ctx.arc(this.x, this.y, this.r, 0, T)
		ctx.fill()
	}
}

export default Dot
