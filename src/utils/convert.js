import store from '@/store'

export default {
	temp: t => ({
		'metric': t => Math.round(t - 273.15),
		'imperial': t => Math.round((t -  273.15) * 9/5 + 32),
	}[store.state.units])(t),

	speed: t => ({
		'metric': s => Math.round(s),
		'imperial': s => Math.round(s * 2.237),
	}[store.state.units])(t),
}
