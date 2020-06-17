import i18n from '@/config/i18n'
import formatDate from '@/utils/formatDate'

export default {
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

		state.forecast = data
		
		// console.log(state.forecast)

		// state.forecast = (data.list || []).reduce((groups, item) => {

		// 	let key = formatDate(item.dt * 1000)

		// 	;(groups[key] = groups[key] || []).push(item)

		// 	return groups
		// }, {})

		// state.last_update = Date.now()
	},	
}
