import rnd from '@/utils/random'
import Dot from './Dot'

const PI = Math.PI

let i = 0
let threshold = 0

let dots = []
let create = (W, H, dpi) => {

	dots = []

	let count = 24
	let speed = 2
	threshold = W / 5

	for (i = 1; i <= count; i++) {

		let s = rnd.range(.5, speed) * dpi

		let limit = PI/12
		let angle = rnd.from([
			rnd.range(limit, PI/2 - limit),
			rnd.range(PI/2 + limit, PI - limit),
			rnd.range(PI + limit, 1.5*PI - limit),
			rnd.range(1.5*PI + limit, 2*PI - limit),
		])

		dots.push(
			new Dot({
				id: i,
				x: rnd.range(0, W),
				y: rnd.range(0, H),
				r: rnd.range(6, 10) * dpi,
				v: {
					x: s * Math.cos(angle),
					y: s * Math.sin(angle),
				},
			})
		)
	}
}

let draw = (ctx, { W, H }) => {

	ctx.fillStyle = '#F0F0F0'
	ctx.fillRect(0, 0, W, H)

	for (i = 0; i < dots.length; i++) {

		dots[i].update(ctx, W, H, dots, threshold)

		Object.values(dots[i].links).forEach(({ line }) => {
			if (line) {
				ctx.beginPath()
				ctx.moveTo(line.from.x, line.from.y)
				ctx.lineTo(line.to.x, line.to.y)

				// ctx.strokeStyle = `rgba(0, 0, 0, ${(threshold - distance) / 10})`
				ctx.strokeStyle = '#000'
				// ctx.lineWidth = Math.min((threshold / distance), Math.min(dots[i].r, dots[j].r))
				ctx.stroke()
			}
		})
	}
}

export { draw, create }
