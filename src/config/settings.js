
module.exports = {
	units: {
		options: ['metric', 'imperial'],
		get initial() {
			let cached = localStorage.getItem('units')
			if (this.options.includes(cached)) return cached

			return this.options[0]
		},
	},
	language: {
		options: ['en', 'ru'],
		get initial() {
			let cached = localStorage.getItem('language')
			if (this.options.includes(cached)) return cached

			let local = navigator.language.slice(0, 2)
			if (this.options.includes(local)) return local

			return this.options[0]
		},
	}
}
