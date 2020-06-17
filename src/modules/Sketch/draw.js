
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

		dots[i].update(W, H)

		// draw lines between
		for (j = 0; j < dots.length; j++) {

			if (j === i) continue

			distance = getDistance(dots[i].x, dots[i].y, dots[j].x, dots[j].y)

			// if (distance < dots[i].r + dots[j].r) {
			// 	dots[i].v.x *= -1
			// 	// dots[i].v.y *= -1

			// 	dots[j].v.x *= -1
			// 	// dots[j].v.y *= -1

			// 	continue
			// }

			if (distance < threshold) {
				ctx.beginPath()
				ctx.moveTo(dots[i].x, dots[i].y)
				ctx.lineTo(dots[j].x, dots[j].y)

				ctx.strokeStyle = `rgba(0, 0, 0, ${(threshold - distance) / 10})`

				ctx.lineWidth = Math.min((threshold / distance), Math.min(dots[i].r, dots[j].r))

				ctx.stroke()
			}
		}

		ctx.beginPath()
		ctx.fillStyle = '#000'

		ctx.arc(dots[i].x, dots[i].y, dots[i].r, 0, 2 * PI)
		ctx.fill()
	}
}

export default draw
