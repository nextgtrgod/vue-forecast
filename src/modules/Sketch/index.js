
const random = Math.random

import Worker from 'worker-loader!./worker'

class Sketch {
	constructor({ canvas, count = 20, dpi = window.devicePixelRatio }) {
		if (!canvas) return console.log('no canvas provided')

		this.canvas = canvas
		this.dpi = dpi
		this.count = count

		let offscreen = canvas.transferControlToOffscreen()
		this.worker = new Worker()

		this.setSize()
		this.createDots()

		this.worker.postMessage({
			type: 'init',
			canvas: offscreen,
			data: this.dots,
			options: {
				W: this.W,
				H: this.H,
				count: count,
				threshold: this.threshold,
			},
		}, [offscreen])

		window.onresize = () => {
			this.setSize()
			this.createDots()

			this.worker.postMessage({
				type: 'resize',
				data: this.dots,
				options: {
					W: this.W,
					H: this.H,
					threshold: this.threshold,
				},
			})
		}
	}

	setSize() {
		this.W = window.innerWidth * this.dpi
		this.H = window.innerHeight * this.dpi

		this.threshold = this.W / 3
	}

	createDots() {
		let dots = []
		dots.length = this.count

		for (let i = 0; i < dots.length; i++) {

			dots[i] = {
				x: random() * this.W,
				y: random() * this.H / 2 + this.H / 4,
				// y: random() * H,
				z: random() * this.dpi,
				r: 10,
				R: random() * this.W / 10, // movement circle radius
				m: {
					x: 2 * random() - 1, // movement direction
					y: 2 * random() - 1,
				},
				s: this.dpi * random() * 1,
			}
	
			dots[i].r = dots[i].r * dots[i].z + dots[i].r / 2
		}
	
		this.dots = dots.sort((a, b) => a.z - b.z)
	}
}

export default Sketch
