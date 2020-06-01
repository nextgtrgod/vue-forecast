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

let coords = null
try {
	let { latitude, longitude } = JSON.parse(localStorage.getItem('coords')) || {}
	if (latitude && longitude) coords = { latitude, longitude }
} catch (error) {
	console.warn('Error reading localStorage:', error)
}

let language = localStorage.getItem('language')
let units = localStorage.getItem('units')

let validate = (value, accept = [], initial) => (
	accept.includes(value) ? value : initial
)

export default new Vuex.Store({
	state: {
		browser,
		reducedMotion,

		coords,

		language: validate(language, ['en', 'ru'], i18n.locale),
		units: validate(units, ['metric', 'imperial'], 'metric'),

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

		setCoords: (state, data) => {
			state.coords = data

			document.title = state.coords.name

			localStorage.setItem('coords', JSON.stringify({
				latitude: state.coords.latitude,
				longitude: state.coords.longitude,
			}))
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
