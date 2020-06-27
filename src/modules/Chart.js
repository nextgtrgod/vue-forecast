import paper from 'paper'
import remap from '@/utils/remap'
import { Tween, autoPlay } from 'es6-tween'
autoPlay(true)

let appWidth = 0
let W = 0
let H = 100

class Chart {
	constructor({ canvas, font, bgColor, fillColor }) {
		this.font = font
		this.bgColor = bgColor
		this.fillColor = fillColor

		paper.setup(canvas)

		this.setSize()
		window.addEventListener('resize', () => this.setSize())
	}

	setSize() {
		appWidth = Math.min(520, window.innerWidth)

		W = appWidth * 8
		paper.view.viewSize.width = W
		paper.view.viewSize.height = H

		this.init()
	}

	init() {
		if (this.plot) this.plot.remove()
		if (this.labels) this.labels.forEach(label => label.remove())

		if (!this.data) this.data = new Array(8).fill( new Array(4).fill(-99) )

		let points = this.convert(this.data)

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

			label.position = new paper.Point(points[i].x + offset, points[i].y)

			this.labels.push(label)
		}

		this.prev = points
	}

	update(data) {
		if (data.length !== this.data.length) {
			this.data = data
			this.init()
			return
		}

		this.data = data

		let next = this.convert(this.data)

		this.animate(next, this.prev)
	}

	convert(data) {
		let range = [
			H / 6,
			H - 2 * this.font.size,
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
					content: temp,
				}))
			]

		}, [])

		// finish chart
		points.push({
			x: points[points.length - 1].x + step,
			y: points[points.length - 1].y,
			content: 0,
		})

		return points
	}

	animate(next) {
		if (this.tween && this.tween.isPlaying())
			this.tween.stop()

		let i = 0
		this.tween = new Tween({ points: this.prev })
			.to({ points: next }, 2500)
			.on('update', ({ points }) => {
				for (i = 0; i < points.length; i++) {
					this.plot.segments[i + 1].point.x = points[i].x
					this.plot.segments[i + 1].point.y = points[i].y
					this.labels[i].position.y = points[i].y
					this.labels[i].content = Math.round(points[i].content) + '°'
				}
				this.plot.smooth({ from: 2 })
			})
			.on('complete', () => this.prev = next)
			.start()
	}
}

export default Chart
