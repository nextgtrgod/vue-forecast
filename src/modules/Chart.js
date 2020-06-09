import remap from '@/utils/remap'
import paper from 'paper'

import rnd from '@/utils/random'

let getArray = length => {
	let arr = [0]

	for (let i = 0; i < length; i++)
		arr.push(rnd.range(5, 60))
	
	return arr
}

class Chart {
	constructor({ canvas, font, bgColor, fillColor }) {
		this.canvas = canvas
		this.W = 520 * 10
		this.H = 100

		this.canvas.width = this.W
		this.canvas.height = this.H

		this.font = font
		this.bgColor = bgColor
		this.fillColor = fillColor
		
		let points = this.convert(getArray(40))
		
		this.init(points)
	}

	init(points) {
		paper.setup(this.canvas)

		this.background = paper.Path.Rectangle({
			rectangle: paper.view.bounds,
			fillColor: this.bgColor,
		})

		this.plot = new paper.Path({
			segments: [
				[ 0, this.H + 1 ],
				...points.map(({ x, y }) => [ x, y ]),
				[ this.W, this.H + 1 ],
			],
			fillColor: this.fillColor,
		})
		this.plot.smooth()

		this.labels = []
		for (let i = 0; i < points.length; i++) {
	
			let label = new paper.PointText({
				content: points[i].content + '°',
				fillColor: this.font.color,
				fontFamily: this.font.family,
				fontSize: this.font.size,
				fontWeight: 'bold',
			})

			label.pivot = label.bounds.bottomCenter

			let offset = 0

			if (i === 0) offset = label.bounds.width
			if (i === points.length - 1) offset = -label.bounds.width

			label.position = new paper.Point(points[i].x + offset / 1.5, points[i].y)

			this.labels.push(label)
		}

		this.chart = new paper.Group([ this.plot, ...this.labels ])
		
		this.chart.pivot = new paper.Point(0, this.H)
	}

	convert(values) {
		let range = [
			this.H / 6,
			this.H - 2 * this.font.size,
		]
		let min = Math.min(...values)
		let max = Math.max(...values)
		let step = 120 || this.W / (values.length - 1)

		// this.canvas.width = step * (values.length - 1)

		return values.map((value, i) => ({
			x: i * step,
			y: this.H - remap(value, min, max, range[0], range[1]),
			content: Math.round(value),
		}))
	}

	update(data = []) {

		let points = this.convert(data)

		if (points[i].content === (points[i + 1] || {}).content) label.visible = false
		else label.visible = true
	}

	scroll(direction) {
		let offset = this.chart.position.x + 520 * direction

		console.log(offset)
		
		if (offset > 0) return

		let tween = this.chart.tweenTo({ 'position.x': offset }, 200)
	}
}

export default Chart
