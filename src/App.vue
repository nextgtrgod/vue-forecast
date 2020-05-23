<template>
<main id="app">
	<search/>
	<widget/>

	<ul>
		<forecast v-for="(item, i) in [1]" :key="i"/>
	</ul>
</main>
</template>


<script>
import data from '@/mock/data'
import API from '@/config'

// let daily_forecast = (data.list || []).reduce((groups, item) => {

// 	let date = new Date(item.dt * 1000)

// 	let key = `${date.getUTCDate()}.${date.getUTCMonth()}.${date.getUTCFullYear()}`

// 	;(groups[key] = groups[key] || []).push(item)

// 	return groups
// }, {})

let daily_forecast = []

daily_forecast.push(data.list[0])


import Search from '@/components/Search'
import Widget from '@/components/Widget'
import Forecast from '@/components/Forecast'

export default {
	name: 'App',
	components: {
		Search,
		Widget,
		Forecast,
	},
	data: () => ({

	}),
	created() {
		this.$store.commit('set', daily_forecast)

		this.askLocation().then(geo => console.log(geo))
	},
	methods: {
		askLocation() {
			return new Promise((resolve, reject) => (
				navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true })
			))
		},
	},
}
</script>


<style lang="scss">
@import './styles/reset.css';
@import './styles/fonts.css';

body {
	display: flex;
	min-height: 100vh;
	min-height: -webkit-fill-available;
}

#app {
	width: 100%;
	max-width: 500px;
	margin: 100px auto;

	@media (min-width: 560px) {
		margin: auto;
	}
}

ul {
	display: flex;
	justify-content: space-between;
	margin: 0 -10px;
}

</style>