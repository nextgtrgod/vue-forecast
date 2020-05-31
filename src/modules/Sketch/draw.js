
let getDistance = (x1, y1, x2, y2) => Math.hypot( abs(x2 - x1), abs(y2 - y1) )

const random = Math.random
const abs = Math.abs
const PI = Math.PI

let i = 0
let j = 0
let distance = 0

let draw = (ctx, dots = [], { W, H, threshold }) => {

	// ctx.fillStyle = '#F0F0F0'
	ctx.clearRect(0, 0, W, H)

	for (i = 0; i < dots.length; i++) {

		// check viewport edges
		if (dots[i].x - dots[i].r < 0 || dots[i].x + dots[i].r > W) dots[i].s.x *= -1
		if (dots[i].y - dots[i].r < 0 || dots[i].y + dots[i].r > H) dots[i].s.y *= -1

		// draw lines between
		for (j = 0; j < dots.length; j++) {

			if (j === i) continue

			distance = getDistance(dots[i].x, dots[i].y, dots[j].x, dots[j].y)

			// if (distance < dots[i].r + dots[j].r) {
			// 	dots[i].s.x *= -1
			// 	// dots[i].s.y *= -1

			// 	dots[j].s.x *= -1
			// 	// dots[j].s.y *= -1

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

		// move them
		dots[i].x += dots[i].s.x
		dots[i].y += dots[i].s.y

		ctx.beginPath()
		ctx.fillStyle = '#000'

		ctx.arc(dots[i].x, dots[i].y, dots[i].r, 0, 2 * PI)
		ctx.fill()
	}
}

export default draw
