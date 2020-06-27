<template>
<section id="widget">
	<weather/>

	<div class="scroll-area" ref="scroll-area">
		<ul>
			<forecast
				v-for="(day, i) in days"
				:date="day.date"
				:weather_id="day.weather_id"
				:key="i"
			/>
		</ul>

		<canvas ref="canvas"/>
	</div>
</section>
</template>


<script>
import { mapState } from 'vuex'
import Weather from '@/components/Weather'
import Forecast from '@/components/Forecast'

import convert from '@/utils/convert'
import loadFont from '@/utils/loadFont'

import Chart from '@/modules/Chart'

export default {
	name: 'Widget',
	components: {
		Weather,
		Forecast,
	},
	mounted() {
		let font = 'jura'
		let rootStyle = getComputedStyle(document.documentElement)

		loadFont(`1em ${font}`).then(() => {

			this.chart = new Chart({
				canvas: this.$refs['canvas'],
				font: {
					family: font,
					size: 16,
					color: rootStyle.getPropertyValue('--color-text'),
				},
				bgColor: 	rootStyle.getPropertyValue('--color-bg'),
				fillColor: 	rootStyle.getPropertyValue('--color-chart'),
			})
			this.chart.update(this.values)
		})
	},
	computed: {
		...mapState({
			forecast: state => state.forecast,
			days: state => (
				state.forecast.daily.map(day => ({
					date: convert.date(day.dt),
					weather_id: day.weather[0].id,
					temp: ['morn', 'day', 'eve', 'night'].map(daytime => 
						convert.temp(day.temp[daytime])
					)
				}))
			),
		}),

		values() {
			return this.days.map(day => day.temp)
		},
	},
	watch: {
		values(values) {
			if (!this.chart) return

			this.chart.update(values)

			this.$nextTick(() => {
				this.$refs['scroll-area'].scrollTo({
					left: 0,
					behavior: 'smooth',
				})
			})
		},
	},
}
</script>


<style lang="scss" scoped>
@import '@/styles/variables';

#widget {
	position: relative;
	height: var(--height);
	color: var(--color-text);
	background: linear-gradient(to bottom, var(--color-bg) 275px, var(--color-chart) 276px);
	overflow: hidden;
	-webkit-mask-image: -webkit-radial-gradient(white, black);
	user-select: none;

	@media (min-width: $app-width) {
		border-radius: var(--radius);
	}
}

html.safari #widget {
	background: var(--color-bg);
}

.scroll-area {
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: auto;
	scroll-snap-type: x mandatory;
	scrollbar-width: none;
}

.scroll-area::-webkit-scrollbar {
	display: none;
}

canvas {
	position: absolute;
	left: 0;
	bottom: 0;
	min-width: 100%;
	background-color: var(--color-bg);
}

ul {
	margin-top: auto;
	display: flex;
	width: 100%;
	height: 185px;
	font-size: 24px;
	z-index: 1;

	li {
		flex-shrink: 0;
	}
}

</style>