import rnd from '@/utils/random'

// import getGpu from '@/utils/getGpu'

import { create, draw } from './draw'
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

		let options = { W, H, dpi: this.dpi }

		if (this.worker)
			return this.worker.postMessage({ options })

		if ('transferControlToOffscreen' in this.canvas) {
			this.worker = new Worker()
			let offscreen = this.canvas.transferControlToOffscreen()

			this.worker.postMessage({
				canvas: offscreen,
				options,
			}, [offscreen])

		} else {
			this.canvas.width = W
			this.canvas.height = H

			cancelAnimationFrame(this.radId)

			let ctx = this.canvas.getContext('2d', { alpha: false, desynchronized: true })

			this.update(ctx, options)
		}
	}

	createDots(count, speed, W, H, dpi) {
		let dots = []
	
		for (let i = 0; i < count; i++) {

			let s = rnd.range(.5, speed) * dpi

			let limit = PI/12
			let angle = rnd.from([
				rnd.range(limit, PI/2 - limit),
				rnd.range(PI/2 + limit, PI - limit),
				rnd.range(PI + limit, 1.5*PI - limit),
				rnd.range(1.5*PI + limit, 2*PI - limit),
			])

			dots.push({
				x: rnd.range(0, W),
				y: rnd.range(0, H),
				r: rnd.range(6, 10) * dpi,
				v: {
					x: s * Math.cos(angle),
					y: s * Math.sin(angle),
				},
			})
		}

		return dots
	}

	update(...args) {
		this.radId = requestAnimationFrame(() => this.update(...args))

		draw(...args)
	}
}

export default Sketch
