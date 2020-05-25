<template>
<main id="app">
	<background/>

	<div class="controls">
		<ui-switch
			:value="language === 'ru'"
			@click.native="switchLanguage"
		/>
	</div>

	<search/>
	<widget/>

	<!-- <ul>
		<forecast v-for="(item, i) in [1]" :key="i"/>
	</ul> -->
</main>
</template>


<script>
import { mapState } from 'vuex'
import data from '@/mock/data'
import API from '@/config'

import Background from '@/components/Background'
import Search from '@/components/Search'
import Widget from '@/components/Widget'
import Forecast from '@/components/Forecast'
import uiSwitch from '@/components/Switch'

export default {
	name: 'App',
	components: {
		Background,
		Search,
		Widget,
		Forecast,
		uiSwitch,
	},
	data: () => ({
		coords: {},
	}),
	async created() {
		try {
			this.coords = (await this.askLocation()).coords
			this.getForecast()

		} catch (error) {
			console.log(error)
		}
	},
	methods: {
		askLocation() {
			return new Promise((resolve, reject) => (
				navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true })
			))
		},

		async getForecast() {
			try {
				let data = await (await fetch(API.get(this.language, this.coords))).json()

				this.$store.commit('set', data)

			} catch (error) {
				console.log(error)
			}
		},

		switchLanguage() {
			this.$store.commit('setLanguage', this.language === 'en' ? 'ru' : 'en')

			this.getForecast()
		},
	},
	computed: {
		...mapState({
			language: state => state.language,
		})
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
	display: flex;
	flex-direction: column;
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
	// margin: 0 -10px;
}

.controls {
	margin-top: -72px;
	margin-left: auto;
	margin-bottom: 15px;
}

</style>