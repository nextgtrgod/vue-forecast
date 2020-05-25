
const random = Math.random
const abs = Math.abs
const PI = Math.PI

let getDistance = (x1, y1, x2, y2) => Math.hypot( abs(x2 - x1), abs(y2 - y1) )

class Sketch {
	constructor({ node, count = 20, dpi = window.devicePixelRatio }) {
		if (!node) return console.log('no canvas provided')

		this.canvas = node
		this.ctx = this.canvas.getContext('2d')
		this.dpi = dpi

		this.count = count

		window.onresize = () => {
			this.setSize()
			this.createDots()
		}

		this.rafId = null

		this.setSize()
		this.createDots()
	}

	setSize() {
		this.W = window.innerWidth * this.dpi
		this.H = window.innerHeight * this.dpi

		this.canvas.width = this.W
		this.canvas.height = this.H

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

	update() {
		this.ctx.clearRect(0, 0, this.W, this.H)
		// ctx.fillStyle = '#0000FF';
		// ctx.fillRect(0, 0, W, H);
	
		this.dots.forEach((d, i, arr) => {
	
			d.x += d.m.x * d.s
			d.y += d.m.y * d.s

			if (d.x - d.r < 0 || d.x + d.r > this.W) d.m.x = -d.m.x
			if (d.y - d.r < 0 || d.y + d.r > this.H) d.m.y = -d.m.y
	
			// draw lines between
			for (let j = i; j < arr.length; j++) {
	
				let distance = getDistance(d.x, d.y, arr[j].x, arr[j].y)
	
				if (distance < this.threshold) {
					this.ctx.beginPath()
					this.ctx.moveTo(d.x, d.y)
					this.ctx.lineTo(arr[j].x, arr[j].y)
					// ctx.strokeStyle = `rgba(255, 255, 255, ${(d.z + arr[j].z) / 2})`
	
					this.ctx.strokeStyle = `rgba(0, 0, 0, ${(this.threshold - distance) / 10})`
	
					this.ctx.lineWidth = 2 * d.z + arr[j].z
					this.ctx.stroke()
				}
	
			}
	
			// draw circle
			let color = 0
	
			this.ctx.beginPath()
			// ctx.fillStyle = `rgba(255, 255, 255, ${d.z})`
			this.ctx.fillStyle = `rgba(${color}, ${color}, ${color}, 1)`
			// ctx.fillStyle = '#1D1D1D'
			this.ctx.arc(d.x, d.y, d.r, 0, 2 * PI)
			this.ctx.fill()
		})
	}

	play() {
		this.update()

		this.rafId = requestAnimationFrame(() => this.play())
	}

	pause() {
		cancelAnimationFrame(this.rafId)
	}
}

export default Sketch
