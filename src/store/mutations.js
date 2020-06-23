
export default {
	setLanguage: (state, data) => {
		state.language = data
	},

	setUnits: (state, data) => {
		state.units = data
	},

	setCoords: (state, data) => {
		state.coords = data

		localStorage.setItem('coords', JSON.stringify({
			latitude: state.coords.latitude,
			longitude: state.coords.longitude,
		}))
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
