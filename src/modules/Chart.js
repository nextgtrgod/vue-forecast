import paper from 'paper'
import remap from '@/utils/remap'
import random from '@/utils/random'

let appWidth = 0
let pages = 7
let W = appWidth * pages
let H = 100

class Chart {
	constructor({ canvas, font, bgColor, fillColor }) {

		paper.setup(canvas)

		appWidth = Math.min(520, window.innerWidth)
		paper.view.viewSize.width = W
		paper.view.viewSize.height = H

		window.addEventListener('resize', () => this.setSize())

		this.font = font
		this.bgColor = bgColor
		this.fillColor = fillColor
	}

	setSize() {
		appWidth = Math.min(520, window.innerWidth)

		this.update(this.data)
	}

	update(data) {
		this.data = data

		let points = this.convert(this.data)

		W = points[points.length - 1].x

		paper.view.viewSize.width = W

		if (this.plot) this.plot.remove()
		if (this.labels) this.labels.forEach(label => label.remove())
		// if (this.dividers) this.dividers.forEach(divider => divider.remove())

		this.plot = new paper.Path({
			segments: [
				[ 0, H ],
				...points.map(({ x, y }) => [ x, y ]),
				[ W, H ],
			],
			fillColor: this.fillColor,
		})
		this.plot.smooth({
			// type: 'catmull-rom',
			// factor: .1,
			from: 2,
		})

		this.labels = []
		for (let i = 0; i < points.length; i++) {
	
			let label = new paper.PointText({
				content: points[i].content,
				fillColor: this.font.color,
				fontFamily: this.font.family,
				fontSize: this.font.size,
				fontWeight: 'bold',
			})
			label.pivot = label.bounds.bottomLeft

			let offset = 0

			if (i % 4 === 0) offset = 12

			if ((i + 3) % 4 === 0) {
				label.fontSize = this.font.size_accent
				offset = -2
			}

			label.position = new paper.Point(points[i].x + offset, points[i].y)

			this.labels.push(label)
		}

		// this.dividers = []
		// for (let i = 0; i < points.length; i+=4) {

		// 	let divider = new paper.Path({
		// 		segments: [[ points[i].x - 1, H ], [ points[i].x - 1, 20 ]],
		// 		strokeColor: this.font.color,
		// 		dashArray: [3, 2],
		// 	})

		// 	this.dividers.push(divider)
		// }
	}

	convert(data) {
		let range = [
			H / 6,
			H - 1.45 * this.font.size_accent,
		]

		let flat_data = data.flat()

		let min = Math.min(...flat_data)
		let max = Math.max(...flat_data)
		let step = 0

		let points = data.reduce((points, day, i) => {

			step = appWidth / (day.length)

			return [
				...points,
				...day.map((temp, j) => ({
					x: i * appWidth + j * step,
					y: H - remap(temp, min, max, range[0], range[1]),
					content: temp + '°',
				}))
			]

		}, [])

		// finish chart
		for (let i = 0; i < 4; i++) {
			points.push({
				x: points[points.length - 1].x + step,
				y: H - remap(random.range(min, max), min, max, range[0], range[1]),
				content: '🤔',
			})
		}

		points.push({
			...points[points.length - 1],
			x: points[points.length - 1].x + step,
		})

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
