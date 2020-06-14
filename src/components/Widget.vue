<template>
<div id="widget">
	<details-view/>

	<div class="scroll-area">
		<canvas ref="canvas"/>

		<ul>
			<forecast
				v-for="(day, i) in days"
				:date="day.date"
				:key="i"
			/>
			<forecast :date="lastDate" />
		</ul>
	</div>
</div>
</template>


<script>
import { mapState } from 'vuex'
import DetailsView from '@/components/Details'
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
		DetailsView,
		Forecast,
	},
	data: () => ({
		progress: 0,
	}),
	mounted() {

		this.init()

		this.$el.addEventListener('scroll', e => {

			this.progress = this.$el.scrollLeft / (this.$el.scrollWidth - this.$el.clientWidth)

			// console.log(this.progress)
		})
	},
	methods: {
		init() {
			let font = 'jura'

			this.preload(font).then(() => {

				this.chart = new Chart({
					canvas: this.$refs['canvas'],
					font: {
						family: font,
						size: 16,
						color: '#FFF',
					},
					bgColor: '#000',
					fillColor: '#31C0D1',
				})
				this.chart.update(this.values)
			})
		},

		preload(font) {
			return new Promise(resolve => {
				if (!('fonts' in document)) return resolve()

				document.fonts.load(`1em ${font}`).then(resolve)
			})
		},
	},
	computed: {
		...mapState({
			days: state => {
				return state.forecast.daily.map(day => {
					// let key = formatDate(item.dt * 1000)

					return {
						date: day.dt * 1000,
						temp: ['morn', 'day', 'eve', 'night'].map(daytime => 
							convert.temp(day.temp[daytime])
						)
					}

					// ;['morn', 'day', 'eve', 'night'].forEach(daytime => {

					// 	;(groups[key] = groups[key] || []).push(convert.temp(item.temp[daytime]))
					// })

					// return groups
				})
			},
		}),

		values() {
			return this.days.map(day => day.temp)
		},

		lastDate() {
			return this.days[this.days.length - 1].date + 86400000
		},
	},
	// watch: {
	// 	days(days) {
			
	// 		if (this.chart) this.chart.update(days)
	// 	},
	// },
}
</script>


<style lang="scss" scoped>

#widget {
	position: relative;
	height: 380px;
	color: #FFF;
	overflow: hidden;
	border-radius: var(--radius);
	user-select: none;
}

.scroll-area {
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
	margin-top: auto;
	min-width: 100%;
	background-color: #000;
}

ul {
	margin-top: -100px;
	display: flex;
	width: 100%;
	height: 100px;
	font-size: 24px;
	z-index: 1;

	li {
		flex-shrink: 0;
	}
}

</style>