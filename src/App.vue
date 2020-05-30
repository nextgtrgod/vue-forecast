<template>
<main id="app">
	<background/>
	<div class="controls">
		<ui-switch
			:value="units === 'metric'"
			:labels="['C°', 'F°']"
			@click.native="switchUnits"
		/>
	</div>
	<search @search="getForecast"/>
	<widget/>
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
		coords: null,
	}),
	async created() {
		try {
			this.coords  = (await this.askLocation()).coords
			this.getForecast(this.coords)

		} catch (error) {
			console.log(error)
		}
	},
	methods: {
		askLocation() {
			return new Promise((resolve, reject) => (
				navigator.geolocation
					.getCurrentPosition(resolve, reject, { enableHighAccuracy: true })
			))
		},

		async getForecast(coords) {
			try {
				let res = await fetch(API.forecast(coords, this.language, this.units))
				let data = await res.json()
				this.$store.commit('setForecast', data)

			} catch (error) {
				console.log(error)
			}
		},

		switchUnits() {
			this.$store.commit('setUnits', this.units === 'metric' ? 'imperial' : 'metric')

			this.getForecast(this.coords)
		},

		switchLanguage() {
			this.$store.commit('setLanguage', this.language === 'en' ? 'ru' : 'en')

			this.getForecast(this.coords)
		},
	},
	computed: {
		...mapState({
			units: state => state.units,
			language: state => state.language,
		})
	},
}
</script>


<style lang="scss">
@import './styles/reset.css';
@import './styles/fonts.css';

@media (prefers-reduced-motion: reduce) {
	* {
		transition: none !important;
	}
}

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

	@media (min-width: 500px) {
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
	padding-right: 5px;

	@media (min-width: 500px) {
		padding-right: 0;
	}
}


// google places autocomplete list
.pac-container {
	margin-top: 2px;
	font-family: inherit;
	background-color: #FFF;
	border: 2px solid;
	border-left: none;
	border-right: none;
	box-shadow: none;

	@media (min-width: 500px) {
		border: 2px solid;
		border-radius: var(--radius);
	}

	&::after {
		display: none;
	}
}

.pac-item {
	padding-left: 11px;
	font-size: 24px;
	line-height: 1.95em;
	color: inherit;
	transition: background-color .15s, border .1s;
	border-top: 1px solid rgba(#000, .1);
	cursor: pointer;

	@media (min-width: 500px) {
		padding-left: 14px;
	}
}

.pac-item-selected {
	border-top-color: #FFCD01 !important;
	background-color: #FFCD01 !important;

	&+.pac-item {
		border-top-color: #FFCD01 !important;
	}

	.pac-item-query + span {
		opacity: .75;
	}
}

.pac-item:hover {
	background-color: var(--color-bg);
	border-top-color: var(--color-bg);

	&+.pac-item {
		border-top-color: var(--color-bg);
	}
}

.pac-item-query {
	font-size: inherit;
	padding-right: .25em;
}

.pac-item-query + span {
	font-size: .65em;
	transition: opacity .1;
	opacity: .5;
}

.pac-icon {
	display: none;
}

</style>