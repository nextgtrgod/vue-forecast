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
			:value="units.index"
			:labels="units.labels"
			@click.native="units.switch"
			:title="$t('units')"
		/>
		<search/>
		<transition-group name="fade" class="widget-wrap">
			<widget v-if="forecast" key="widget"/>
		</transition-group>
	</div>

	<ui-switch
		class="language"
		:value="language.index"
		:labels="language.labels"
		@click.native="language.switch"
		:title="$t('language')"
	/>
</main>
</template>


<script>
import { mapState } from 'vuex'

import Background from '@/components/Background'
import Search from '@/components/Search'
import Widget from '@/components/Widget'
import uiSwitch from '@/components/Switch'

import { units, language } from '@/config/settings'

export default {
	name: 'App',
	components: {
		Background,
		Search,
		Widget,
		uiSwitch,
	},
	data: () => ({
		units,
		language,
	}),
	computed: {
		...mapState({
			forecast: state => state.forecast,
		})
	}
}
</script>


<style lang="scss">
@import './styles/reset.css';
@import './styles/fonts.css';
@import '@/styles/variables';
@import '@/styles/mixins';

:root {
	--width: #{$app-width};
}

@media (prefers-reduced-motion: reduce) {
	* {
		transition: none !important;
	}
}

body {
	position: relative;
}

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

	@media (min-width: $app-width) {
		margin: auto;
	}
}

.units {
	margin-top: -44px;
	margin-left: auto;
	margin-right: 4px;
	margin-bottom: 15px;

	@media (min-width: $app-width) {
		margin-right: 0;
	}
}

.language {
	position: absolute !important;
	bottom: 10px;
	right: 4px;

	@media (min-width: $app-width) {
		bottom: 20px;
		right: 20px;
	}

	span {
		font-size: 12px !important;

		@media (min-width: $app-width) {
			font-size: 16px !important;
		}
	}
}


@include transition(fade, .4s);

.widget-wrap {
	min-height: 385px;
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

	@media (min-width: $app-width) {
		border: 2px solid;
		border-radius: var(--radius);
	}

	&::after {
		display: none;
	}
}

.pac-item {
	padding-left: 9px;
	font-size: 24px;
	line-height: 1.95em;
	color: inherit;
	transition: background-color .15s, border .1s;
	border-top: 1px solid rgba(#000, .1);
	cursor: pointer;

	@media (min-width: $app-width) {
		padding-left: 14px;
	}
}

.pac-item-selected {
	border-top-color: var(--color-accent) !important;
	background-color: var(--color-accent) !important;

	&+.pac-item {
		border-top-color: var(--color-accent) !important;
	}

	.pac-item-query + span {
		opacity: .75;
	}
}

.pac-item:hover {
	background-color: var(--color-accent);
	border-top-color: var(--color-accent);

	&+.pac-item {
		border-top-color: var(--color-accent);
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


// mapbox
.mapboxgl-ctrl-logo {
	display: none !important;
}

</style>