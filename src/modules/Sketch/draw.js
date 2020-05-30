
let getDistance = (x1, y1, x2, y2) => Math.hypot( abs(x2 - x1), abs(y2 - y1) )

const random = Math.random
const abs = Math.abs
const PI = Math.PI

let i = 0
let j = 0
let distance = 0

let draw = (ctx, dots = [], { W, H, threshold }) => {

	ctx.fillStyle = '#F0F0F0'
	ctx.fillRect(0, 0, W, H)

	for (i = 0; i < dots.length; i++) {

		// move them
		dots[i].x += dots[i].m.x * dots[i].s
		dots[i].y += dots[i].m.y * dots[i].s

		// check viewport edges
		if (dots[i].x - dots[i].r < 0 || dots[i].x + dots[i].r > W) dots[i].m.x = -dots[i].m.x
		if (dots[i].y - dots[i].r < 0 || dots[i].y + dots[i].r > H) dots[i].m.y = -dots[i].m.y

		// draw lines between
		for (j = 0; j < dots.length; j++) {

			if (j === i) continue

			distance = getDistance(dots[i].x, dots[i].y, dots[j].x, dots[j].y)

			if (distance < dots[i].r + dots[j].r) {
				// dots[i].m.x *= -1
				dots[i].m.x *= -1

				// dots[j].m.x *= -1
				dots[j].m.y *= -1

				continue
			}

			if (distance < threshold) {
				ctx.beginPath()
				ctx.moveTo(dots[i].x, dots[i].y)
				ctx.lineTo(dots[j].x, dots[j].y)
				// ctx.strokeStyle = `rgba(255, 255, 255, ${(d.z + dots[j].z) / 2})`

				ctx.strokeStyle = `rgba(0, 0, 0, ${(threshold - distance) / 10})`

				ctx.lineWidth = Math.min((threshold / distance), Math.min(dots[i].r, dots[j].r))
				ctx.stroke()
			}
		}

		ctx.beginPath()
		// ctx.fillStyle = `rgba(255, 255, 255, ${d.z})`
		// if (Math.abs(dots[i].m.x) < 0.05) ctx.fillStyle = '#0F0'
		// else if (Math.abs(dots[i].m.y) < 0.05) ctx.fillStyle = '#00F'
		// else if (dots[i].s < .25) ctx.fillStyle = '#F00'
		// else ctx.fillStyle = '#000'

		ctx.fillStyle = '#000'

		ctx.arc(dots[i].x, dots[i].y, dots[i].r, 0, 2 * PI)
		ctx.fill()
	}
}

export default draw
