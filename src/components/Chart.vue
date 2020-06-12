<template>
<div id="chart">
	<canvas ref="canvas"/>
	<!-- <button @click="scroll(1)"/>
	<button @click="scroll(-1)"/> -->
</div>
</template>


<script>
import { mapState } from 'vuex'
import convert from '@/utils/convert'
// import { Tween, autoPlay } from 'es6-tween'
import Chart from '@/modules/Chart'

let formatDate = t => {
	let d = new Date(t)

	return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()).getTime()
}

// autoPlay(true)

export default {
	name: 'Chart',
	async mounted() {
		let font = 'jura'

		await this.preload(font)

		this.chart = new Chart({
			canvas: this.$refs['canvas'],
			font: {
				family: font,
				size: 12,
				color: '#FFF',
			},
			bgColor: '#000',
			fillColor: '#31C0D1',
		})
		this.chart.update(this.days)

		this.$refs['canvas'].addEventListener('touchmove', ({ e }) => e.preventDefault())
	},
	methods: {
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
				return Object.values(state.forecast.hourly.reduce((groups, item) => {
					let key = formatDate(item.dt * 1000)

					;(groups[key] = groups[key] || []).push(convert.temp(item.temp))

					return groups
				}, {}))
			},
		}),
	},
	watch: {
		days(days) {
			
			if (this.chart) this.chart.update(days)
		},
	},
}
</script>


<style lang="scss" scoped>

#chart {
	position: relative;
	height: 100%;
	overflow: auto;
	scrollbar-width: none;
}

#chart::-webkit-scrollbar {
	display: none;
}

canvas {
	position: absolute;
	left: 0;
	bottom: 0;
	min-width: 100%;
	border-bottom-left-radius: var(--radius);
	border-bottom-right-radius: var(--radius);
}

button {
	position: absolute;
	top: 0;
	display: inline-block;
	height: 100px;
	width: 50%;
	cursor: pointer;
	z-index: 1;

	&:first-of-type {
		left: 0;
	}

	&:last-of-type {
		right: 0;
	}
}

</style>