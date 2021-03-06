import rnd from '@/utils/random'
import Dot from './Dot'

const PI = Math.PI

let i = 0
let threshold = 0

let dots = []
let create = ({ W, H, dpi }) => {

	dots = []

	let count = 16
	let speed = 2
	threshold = W / 3

	for (i = 0; i < count; i++) {

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

let id = null
let draw = (ctx, { W, H }) => {

	// clear canvas
	ctx.fillStyle = '#F0F0F0'
	ctx.fillRect(0, 0, W, H)

	for (i = 0; i < dots.length; i++) {

		dots[i].update(ctx, W, H, dots, threshold)

		for (id in dots[i].lines) {
			ctx.beginPath()
			ctx.moveTo(dots[i].lines[id][0].x, dots[i].lines[id][0].y)
			ctx.lineTo(dots[i].lines[id][1].x, dots[i].lines[id][1].y)

			ctx.strokeStyle = `rgba(0, 0, 0, ${dots[i].lines[id].alpha})`
			ctx.lineWidth = dots[i].lines[id].width
			ctx.stroke()
		}
	}
}

export { create, draw }
