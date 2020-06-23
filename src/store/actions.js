import API from '@/config/api'

export default {
	getForecast: async ({ state, commit }) => {
		try {
			let res = await fetch(API.forecast(state.coords, state.language, state.units))
			let data = await res.json()

			commit('setForecast', data)

		} catch (error) {
			console.log(error)
		}
	}
}
