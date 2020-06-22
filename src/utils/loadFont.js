
let loadFont = font => new Promise(resolve => {
	if (!('fonts' in document)) return resolve()

	document.fonts.load(font).then(resolve)
})

export default loadFont
