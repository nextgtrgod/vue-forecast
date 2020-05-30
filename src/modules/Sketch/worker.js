
import draw from './draw'

self.radId = null
self.canvas = null

onmessage = e => {
	let { canvas, data, options } = e.data

	if (canvas) self.canvas = canvas

	self.canvas.width = options.W
	self.canvas.height = options.H

	let ctx = self.canvas.getContext('2d', { alpha: true, desynchronized: true })
	ctx.fillStyle = '#0f0'

	cancelAnimationFrame(self.radId)

	self.rafId = update(ctx, data, options)
}

let update = (...args) => {
	self.radId = requestAnimationFrame(() => update(...args))

	draw(...args)
}
