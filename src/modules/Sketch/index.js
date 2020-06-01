import rnd from '@/utils/random'

// import getGpu from '@/utils/getGpu'

import draw from './draw'
import Worker from 'worker-loader!./worker'

let PI = Math.PI

class Sketch {
	constructor(canvas, dpi = window.devicePixelRatio, speed = 1.5) {
		this.canvas = canvas
		this.dpi = dpi
		this.speed = speed

		// let gpu = getGpu()
		// console.log(gpu)

		this.init()

		let resizeTimer = null

		window.onresize = () => {
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(() => this.init(), 150)
		}
	}

	init() {
		let W = window.innerWidth * this.dpi
		let H = window.innerHeight * this.dpi
		let count = ~~(window.innerWidth / (window.innerWidth < 720 ? 25 : 80))
		let speed = this.speed
		let threshold = W / 3
		let dots = this.createDots(count, speed, W, H, this.dpi)

		if (this.worker) {
			this.worker.postMessage({
				data: dots,
				options: { W, H, threshold },
			})
			return
		}

		if ('transferControlToOffscreen' in this.canvas) {
			this.worker = new Worker()
			let offscreen = this.canvas.transferControlToOffscreen()

			this.worker.postMessage({
				canvas: offscreen,
				data: dots,
				options: { W, H, threshold },
			}, [offscreen])

		} else {
			this.canvas.width = W
			this.canvas.height = H

			cancelAnimationFrame(this.radId)

			let ctx = this.canvas.getContext('2d', { alpha: false, desynchronized: true })

			this.update(ctx, dots, { W, H, threshold })
		}
	}

	createDots(count, speed, W, H, dpi) {
		let dots = []
		dots.length = count
	
		for (let i = 0; i < dots.length; i++) {

			let s = rnd.range(.5, speed) * dpi

			let limit = PI/12
			let angle = rnd.from([
				rnd.range(limit, PI/2 - limit),
				rnd.range(PI/2 + limit, PI - limit),
				rnd.range(PI + limit, 1.5*PI - limit),
				rnd.range(1.5*PI + limit, 2*PI - limit),
			])

			dots[i] = {
				x: rnd.range(0, W),
				y: rnd.range(0, H),
				r: rnd.range(6, 15) * dpi,
				s: {
					x: s * Math.cos(angle),
					y: s * Math.sin(angle),
				},
			}
		}

		return dots
	}

	update(...args) {
		this.radId = requestAnimationFrame(() => this.update(...args))

		draw(...args)
	}
}

export default Sketch
