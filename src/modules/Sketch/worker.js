
import draw from './draw'

self.radId = null
self.canvas = null

onmessage = e => {

	let { type, canvas, data, options } = e.data

	if (type === 'init') self.canvas = canvas

	self.canvas.width = options.W
	self.canvas.height = options.H

	let ctx = self.canvas.getContext('2d')

	cancelAnimationFrame(radId)

	self.rafId = update(ctx, data, options)
}

let update = (...args) => {
	self.radId = requestAnimationFrame(() => update(...args))

	draw(...args)
}
