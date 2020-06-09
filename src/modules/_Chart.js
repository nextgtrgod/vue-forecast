import remap from '@/utils/remap'
import paper from 'paper'

class Chart {
	constructor({ canvas, font }) {
		this.canvas = canvas
		this.dpi = 2 || window.devicePixelRatio
		this.ctx = this.canvas.getContext('2d', { alpha: false })
		this.W = 520
		this.H = 100

		// this.canvas.width = this.W * this.dpi
		// this.canvas.height = this.H * this.dpi

		this.canvas.width = this.W
		this.canvas.height = this.H

		this.font = {
			size: 12 * this.dpi,
			family: font,
		}
		this.ctx.font = `${this.font.size}px ${this.font.family}`

		paper.setup(this.canvas)
	}

	update(values = []) {
		console.log(values)
		
		let range = [
			this.canvas.height / 6,
			this.canvas.height - 2 * this.font.size,
		]
		let min = Math.min(...values)
		let max = Math.max(...values)
		let step = 120 || this.canvas.width / (values.length - 1)

		// this.canvas.width = step * (values.length - 1)

		this.ctx.font = `${this.font.size}px ${this.font.family}`

		let points = values.map((value, i) => ({
			x: i * step,
			y: this.canvas.height - remap(value, min, max, range[0], range[1]),
			value,
		}))

		this.draw(this.ctx, points)
	}

	draw(ctx, points) {

		let path = new paper.Path({
			segments: points.map(({ x, y }) => [ x, y ]),
			strokeColor: 'black',
			strokeWidth: 2,
			// closed: true,
		})

		return

		// ctx.globalCompositeOperation = 'xor'
		ctx.fillStyle = '#000'
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

		ctx.beginPath()
		ctx.moveTo(0, ctx.canvas.height)

		let i = 0
		ctx.lineTo(points[i].x, points[i].y)

		for (i = 1; i < points.length - 2; i++) {

			let c = {
				x: (points[i].x + points[i + 1].x) / 2,
				y: (points[i].y + points[i + 1].y) / 2,
			}

			ctx.quadraticCurveTo(points[i].x, points[i].y, c.x, c.y)
		}
		ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)

		ctx.lineTo(ctx.canvas.width, ctx.canvas.height)
		ctx.closePath()
		ctx.fillStyle = '#FFCD01'
		ctx.fill()

		// text
		ctx.fillStyle = '#FFF'
		ctx.textAlign = 'left'

		let x = 0
		let y = 0
		let indent = this.font.size / 4
		for (let i = 0; i < points.length; i++) {

			ctx.textAlign = 'center'

			if (points[i].value === (points[i + 1] || {}).value) continue

			x = points[i].x

			if (i === 0) {
				x += indent
				ctx.textAlign = 'left'
			}
			if (i === points.length - 1) {
				x -= indent
				ctx.textAlign = 'right'
			}

			y = points[i].y - this.font.size / 2

			ctx.fillText(`${Math.round(points[i].value)}°`, x, y)
		}
	}
}

export default Chart
