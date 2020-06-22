import getDistance from '@/utils/getDistance'

const T = 2 * Math.PI
let i = 0

class Dot {
	constructor({ id, x, y, r, v, fill = '#000' }) {
		this.id = id
		this.x = x
		this.y = y
		this.r = r
		this.v = v
		this.fill = fill

		this.links = {}

		this.setBounds()
	}

	checkCollision(W, H) {
		if (this.bounds.left <= 0 && this.v.x <= 0) this.v.x *= -1
		else if (this.bounds.right >= W && this.v.x >= 0) this.v.x *= -1

		if (this.bounds.top <= 0 && this.v.y <= 0) this.v.y *= -1
		else if (this.bounds.bottom >= H && this.v.y >= 0) this.v.y *= -1
	}

	setBounds() {
		this.bounds = {
			top: this.y - this.r,
			right: this.x + this.r,
			bottom: this.y + this.r,
			left: this.x - this.r,
		}
	}

	link(dots, threshold) {
		let distance = 0

		for (i = 0; i < dots.length; i++) {
			if (dots[i].id === this.id) continue
			if (dots[i].links[this.id]) continue

			distance = getDistance(this.x, this.y, dots[i].x, dots[i].y)

			let line = distance < threshold
				? { from: { x: this.x, y: this.y }, to: { x: dots[i].x, y: dots[i].y } }
				: null

			this.links[dots[i].id] = {
				line,
			}
		}
	}

	update(ctx, W, H, dots, threshold) {
		this.checkCollision(W, H)

		this.x += this.v.x || 0
		this.y += this.v.y || 0

		this.setBounds()
		this.link(dots, threshold)

		ctx.beginPath()
		ctx.fillStyle = this.fill
		ctx.arc(this.x, this.y, this.r, 0, T)
		ctx.fill()
	}
}

export default Dot
