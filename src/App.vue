<i18n>
ru:
 language: "Предпочитаемый язык"
 units: "Единицы измерения температуры"
en:
 language: "Preferred language"
 units: "Temperature units"
</i18n>


<template>
<main id="app">
	<background/>

	<div class="center">
		<ui-switch
			class="units"
			:value="units === 'metric'"
			:labels="['C°', 'F°']"
			@click.native="switchUnits"
			:title="$t('units')"
		/>
		<search ref="search"/>
		<widget/>
	</div>

	<ui-switch
		class="language"
		:value="language === 'en'"
		:labels="['EN', 'RU']"
		@click.native="switchLanguage"
		:title="$t('language')"
	/>
</main>
</template>


<script>
import { mapState } from 'vuex'
import API from '@/config'

import Background from '@/components/Background'
import Search from '@/components/Search'
import Widget from '@/components/Widget'
import uiSwitch from '@/components/Switch'


export default {
	name: 'App',
	components: {
		Background,
		Search,
		Widget,
		uiSwitch,
	},
	methods: {
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

		async switchLanguage() {
			this.$store.commit('setLanguage', this.language === 'en' ? 'ru' : 'en')

			await this.$refs['search'].init()
			this.getForecast(this.coords)
		},
	},
	computed: {
		...mapState({
			language: state => state.language,
			coords: state => state.coords,
			units: state => state.units,
		}),
	},
	watch: {
		coords: {
			immediate: true,
			handler(coords) {
				if (coords) this.getForecast(coords)
			},
		},
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

// body {
// 	position: relative;
// }

#app {
	display: flex;
	min-height: 100vh;
	min-height: -webkit-fill-available;
}

.center {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: var(--width);
	margin: 100px auto;

	@media (min-width: 500px) {
		margin: auto;
	}
}

.units {
	margin-top: -44px;
	margin-left: auto;
	margin-bottom: 15px;
	padding-right: 5px;

	@media (min-width: 500px) {
		padding-right: 0;
	}
}

.language {
	position: absolute !important;
	bottom: 10px;
	right: 5px;

	span {
		font-size: 16px !important;
	}

	@media (min-width: 500px) {
		bottom: 20px;
		right: 20px;
	}
}


// google places autocomplete list
.pac-container {
	width: 100% !important;
	max-width: var(--width);
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


<style lang="postcss">

/* body::after {
	background: linear-gradient(to top, #F0F0F0, cubic-bezier(1, 0, 1, 0), transparent);
} */

</style>