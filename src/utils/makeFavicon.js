import loadFont from '@/utils/loadFont'

let color = window.matchMedia('(prefers-color-scheme: dark)').matches ? '#FFF' : '#000'

let makeFavicon = async (text, font) => {
	await loadFont(font)

	let canvas = document.createElement('canvas')
	canvas.width = 128
	canvas.height = 128

	let ctx = canvas.getContext('2d')
	ctx.textBaseline = 'middle'
	ctx.textAlign = 'center'
	ctx.font = font

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	
	ctx.fillStyle = color
	
	ctx.fillText(text, canvas.width / 2, canvas.height / 2, canvas.width)
	
	let data = canvas.toDataURL('image/png')

	let link = document.querySelector('link[rel*="icon"]')
	link.type = 'image/x-icon'
	link.href = data
}

export default makeFavicon
