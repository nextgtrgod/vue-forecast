import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import i18n from '@/config/i18n'
import formatDate from '@/utils/formatDate'
import checkBrowser from '@/utils/checkBrowser'

const browser = checkBrowser()
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (reducedMotion || browser !== 'chrome') {
	let link = document.createElement('link')
	link.rel = 'stylesheet'
	link.href = 'weather-icons/weather-icons.css'
	document.head.appendChild(link)
}


const settings = {
	units: {
		default: 'metric',
		valid: ['metric', 'imperial'],
	},
	language: {
		default: i18n.locale,
		valid: ['en', 'ru'],
	},
}

let units = localStorage.getItem('units')
let language = localStorage.getItem('language')

export default new Vuex.Store({
	state: {
		browser,
		reducedMotion,

		language: settings.language.valid.includes(language)
			? language
			: settings.language.default,

		units: settings.units.valid.includes(units)
			? units
			: settings.units.default,

		city: {},
		forecast: {},
	},
	mutations: {
		setLanguage: (state, data) => {
			state.language = data
			i18n.locale = state.language
			document.documentElement.lang = state.language
			localStorage.setItem('language', state.language)
		},

		setUnits: (state, data) => {
			state.units = data
			localStorage.setItem('units', state.units)
		},
		
		setForecast: (state, data) => {

			state.city = data.city

			state.forecast = (data.list || []).reduce((groups, item) => {

				let key = formatDate(item.dt * 1000)

				;(groups[key] = groups[key] || []).push(item)

				return groups
			}, {})
		},
	},
	getters: {
		current: state => {
			return state.forecast[formatDate(Date.now())]
		},
	},
})
