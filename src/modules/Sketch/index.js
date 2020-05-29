const rnd = Math.random

// import getGpu from '@/utils/getGpu'

import draw from './draw'
import Worker from 'worker-loader!./worker'

class Sketch {
	constructor(canvas) {
		this.canvas = canvas
		this.dpi = window.devicePixelRatio

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
		let count = ~~(window.innerWidth / (window.innerWidth < 720 ? 25 : 100))
		let threshold = W / 1.5
		let dots = this.createDots(count, W, H, this.dpi)

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

			let ctx = this.canvas.getContext('2d', { alpha: false })

			this.update(ctx, dots, { W, H, threshold })
		}
	}

	createDots(count, W, H, dpi) {
		let dots = []
		dots.length = count
	
		for (let i = 0; i < dots.length; i++) {
	
			dots[i] = {
				x: rnd() * W,
				y: rnd() * H / 2 + H / 4,
				z: rnd() * dpi,
				r: 10,
				R: rnd() * W / 10, // movement circle radius
				m: {
					x: 2 * rnd() - 1, // movement direction
					y: 2 * rnd() - 1,
				},
				s: dpi * rnd() * 1,
			}
	
			dots[i].r = dots[i].r * dots[i].z + dots[i].r / 2
		}
	
		return dots.sort((a, b) => a.z - b.z)
	}

	update(...args) {
		this.radId = requestAnimationFrame(() => this.update(...args))

		draw(...args)
	}
}

export default Sketch
