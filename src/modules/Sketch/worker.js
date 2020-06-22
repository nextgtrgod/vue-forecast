import { create, draw } from './draw'

self.radId = null
self.canvas = null

onmessage = e => {
	let { canvas, options } = e.data
	let { W, H, dpi } = options

	if (canvas) self.canvas = canvas

	self.canvas.width = W
	self.canvas.height = H

	let ctx = self.canvas.getContext('2d', { alpha: false, desynchronized: true })

	cancelAnimationFrame(self.radId)

	create(W, H, dpi)

	self.rafId = self.update(ctx, options)
}

self.update = (...args) => {
	self.radId = requestAnimationFrame(() => update(...args))

	draw(...args)
}
