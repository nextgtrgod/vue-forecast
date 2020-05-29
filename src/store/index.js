import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import i18n from '@/config/i18n'

let formatDate = t => {
	let date = new Date(t)

	return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
}

export default new Vuex.Store({
	state: {
		language: i18n.locale,
		units: 'celsius', // farenheits

		city: {},
		forecast: {},
	},
	mutations: {
		setLanguage: (state, data) => {
			state.language = data
			i18n.locale = state.language
			document.documentElement.lang = state.language
		},
		
		set: (state, data) => {

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
