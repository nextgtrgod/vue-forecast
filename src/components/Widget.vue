<template>
<section id="widget">
	<weather/>

	<div class="scroll-area" ref="scroll-area">
		<ul>
			<forecast
				v-for="(day, i) in days"
				:date="day.date"
				:key="i"
			/>
			<forecast :date="lastDate" />
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
// import { Tween, autoPlay } from 'es6-tween'
import Chart from '@/modules/Chart'

let formatDate = t => {
	let d = new Date(t)

	return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()).getTime()
}

// autoPlay(true)

export default {
	name: 'Widget',
	components: {
		Weather,
		Forecast,
	},
	data: () => ({
		progress: 0,
	}),
	mounted() {
		this.init()

		let scrollArea = this.$refs['scroll-area']
		scrollArea.addEventListener('scroll', e => {

			this.progress = scrollArea.scrollLeft / (scrollArea.scrollWidth - scrollArea.clientWidth)
		})
	},
	methods: {
		init() {
			let font = 'jura'
			let rootStyle = getComputedStyle(document.documentElement)

			this.preload(font).then(() => {

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

		preload: font => new Promise(resolve => {
			if (!('fonts' in document)) return resolve()

			document.fonts.load(`1em ${font}`).then(resolve)
		}),
	},
	computed: {
		...mapState({
			days: state => (
				state.forecast.daily.map(day => ({
					date: convert.date(day.dt),
					temp: ['morn', 'day', 'eve', 'night'].map(daytime => 
						convert.temp(day.temp[daytime])
					)
				}))
			),
		}),

		values() {
			return this.days.map(day => day.temp)
		},

		lastDate() {
			return this.days[this.days.length - 1].date + 86400000
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
	height: 375px;
	color: var(--color-text);
	background: linear-gradient(to bottom, var(--color-bg) 280px, var(--color-chart) 281px);
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