import i18n from '@/config/i18n'

export default {
	setLanguage: (state, data) => {
		state.language = data

		i18n.locale = state.language

		document.documentElement.lang = state.language

		localStorage.setItem('language', state.language)
	},

	setCoords: (state, data) => {
		state.coords = data

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
	},

	setCity: (state, data) => {
		if (!data) return

		state.city = data
		document.title = state.city
		localStorage.setItem('city', state.city)
	}
}
