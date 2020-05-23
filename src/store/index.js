import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		language: 'en', // ru
		units: 'celsius', // farenheits
	},
	mutations: {
		set(state, data) {
			state.weather = data
		},
	},
})
