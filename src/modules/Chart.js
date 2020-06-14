import paper from 'paper'
import remap from '@/utils/remap'
import random from '@/utils/random'

let pages = 7
let W = 520 * pages
let H = 200

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
		// this.background = paper.Path.Rectangle({
		// 	rectangle: paper.view.bounds,
		// 	fillColor: this.bgColor,
		// })

		// this.chart = new paper.Group([ this.plot, ...this.labels ])
		// this.chart.pivot = new paper.Point(0, this.H)
	}

	update(data) {
		let points = this.convert(data)

		W = points[points.length - 1].x

		paper.view.viewSize.width = W

		if (this.plot) this.plot.remove()
		if (this.labels) this.labels.forEach(label => label.remove())
		if (this.dividers) this.labels.forEach(divider => divider.remove())

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

			// if (points[i].content === (points[i - 1] || {}).content) continue
	
			let label = new paper.PointText({
				content: points[i].content,
				fillColor: this.font.color,
				fontFamily: this.font.family,
				fontSize: this.font.size,
				fontWeight: 'bold',
			})
			label.pivot = label.bounds.bottomLeft

			let offset = 0

			if (i % 4 === 0) {
				label.fontSize = 28
				offset = 6

				// offset = label.bounds.width
			}
			// if (i === points.length - 1) offset = -label.bounds.width

			label.position = new paper.Point(points[i].x + offset, points[i].y)

			this.labels.push(label)
		}

		this.dividers = []
		for (let i = 0; i < points.length; i+=4) {

			let divider = new paper.Path({
				segments: [[ points[i].x - 1, points[i].y ], [ points[i].x - 1, H ]],
				strokeColor: '#FFF',
				dashArray: [5, 5],
			})

			this.dividers.push(divider)
		}
	}

	convert(data) {
		let range = [
			100,
			H - 2 * this.font.size,
		]

		let flat_data = data.flat()

		let min = Math.min(...flat_data)
		let max = Math.max(...flat_data)
		let step = 0

		let points = data.reduce((points, day, i) => {

			step = 520 / (day.length)

			return [
				...points,
				...day.map((temp, j) => ({
					x: i * 520 + j * step,
					y: H - remap(temp, min, max, range[0], range[1]),
					content: temp + '°',
				}))
			]

		}, [])

		// finish chart
		for (let i = 0; i < 5; i++) {
			points.push({
				x: points[points.length - 1].x + step,
				y: H - remap(random.range(min, max), min, max, range[0], range[1]),
				content: '🤔',
			})
		}

		console.log(points)

		return points
	}

	// scroll(direction) {
	// 	let offset = this.chart.position.x + 520 * direction

	// 	console.log(offset)
		
	// 	if (offset > 0 || offset < -this.W) return

	// 	let tween = this.chart.tweenTo({ 'position.x': offset }, { duration: 400, easing: 'easeInOutCubic' })
	// }
}

export default Chart
