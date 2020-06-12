import paper from 'paper'
import remap from '@/utils/remap'

let pages = 7
let W = 520 * pages
let H = 100

class Chart {
	constructor({ canvas, font, bgColor, fillColor }) {

		paper.setup(canvas)

		paper.view.viewSize.width = W
		paper.view.viewSize.height = H

		this.font = font
		this.bgColor = bgColor
		this.fillColor = fillColor
		
		this.init(this.W, this.H)
	}

	init() {
		this.background = paper.Path.Rectangle({
			rectangle: paper.view.bounds,
			fillColor: this.bgColor,
		})

		// this.chart = new paper.Group([ this.plot, ...this.labels ])
		// this.chart.pivot = new paper.Point(0, this.H)
	}

	update(data) {
		let points = this.convert(data)

		paper.view.viewSize.width = points[points.length - 1].x

		if (this.plot) this.plot.remove()
		if (this.labels) this.labels.forEach(label => label.remove())

		this.plot = new paper.Path({
			segments: [
				[ 0, H ],
				...points.map(({ x, y }) => [ x, y ]),
				[ W, H ],
			],
			fillColor: this.fillColor,
		})
		this.plot.smooth()

		this.labels = []
		for (let i = 0; i < points.length; i++) {

			if (points[i].content === (points[i - 1] || {}).content) continue
	
			let label = new paper.PointText({
				content: points[i].content,
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
	}

	convert(data) {
		let range = [
			H / 6,
			H - 2 * this.font.size,
		]

		let flat_data = data.flat()

		let min = Math.min(...flat_data)
		let max = Math.max(...flat_data)
	
		return data.reduce((points, day, i) => {

			let step = 520 / day.length

			return [
				...points,
				...day.map((temp, j) => ({
					x: i * 520 + j * step,
					y: H - remap(temp, min, max, range[0], range[1]),
					content: temp,
				}))
			]

		}, [])
	}

	// scroll(direction) {
	// 	let offset = this.chart.position.x + 520 * direction

	// 	console.log(offset)
		
	// 	if (offset > 0 || offset < -this.W) return

	// 	let tween = this.chart.tweenTo({ 'position.x': offset }, { duration: 400, easing: 'easeInOutCubic' })
	// }
}

export default Chart
