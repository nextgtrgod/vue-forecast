// import getGpu from '@/utils/getGpu'

import { create, draw } from './draw'
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

			let ctx = this.canvas.getContext('2d', { alpha: false })
			create(options)
			this.update(ctx, options)
		}
	}

	update(...args) {
		this.radId = requestAnimationFrame(() => this.update(...args))

		draw(...args)
	}
}

export default Sketch
