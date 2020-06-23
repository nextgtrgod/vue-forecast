import store from '@/store'
import i18n from '@/config/i18n'

let	units = {
	options: ['metric', 'imperial'],
	labels: ['C°', 'F°'],
	current: '',
	init() {
		let cached = localStorage.getItem('units')
		if (this.options.includes(cached)) return this.current = cached
	
		this.current = this.options[0]
	},
	get index() {
		return this.options.indexOf(this.current)
	},
	switch() {
		this.current = this.options[(this.index + 1) % 2]

		store.commit('setUnits', this.current)

		localStorage.setItem('units', this.current)
	},
}
units.init()
	
let language = {
	options: ['en', 'ru'],
	labels: ['EN', 'RU'],
	current: '',
	init() {
		let cached = localStorage.getItem('language')
		if (this.options.includes(cached)) return this.current = cached

		let local = navigator.language.slice(0, 2)
		if (this.options.includes(local)) return this.current = local

		this.current = this.options[0]
	},
	get index() {
		return this.options.indexOf(this.current)
	},
	switch() {
		this.current = this.options[(this.index + 1) % 2]

		store.commit('setLanguage', this.current)

		i18n.locale = this.current
		document.documentElement.lang = this.current
		localStorage.setItem('language', this.current)
	},
}
language.init()
if (document.documentElement.lang !== language.current)
	document.documentElement.lang = language.current

export { units, language }
