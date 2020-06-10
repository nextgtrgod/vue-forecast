<template>
<div id="chart">
	<canvas ref="canvas"/>
	<button @click="scroll(1)"/>
	<button @click="scroll(-1)"/>
</div>
</template>


<script>
import { mapState } from 'vuex'
// import { Tween, autoPlay } from 'es6-tween'
import Chart from '@/modules/Chart'

let formatDate = t => {
	let date = new Date(t)
	return `${date.getUTCDate()}.${date.getUTCMonth()}.${date.getUTCFullYear()}`
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
	},
	methods: {
		preload(font) {
			return new Promise(resolve => {
				if (!('fonts' in document)) return resolve()

				document.fonts.load(`1em ${font}`).then(resolve)
			})
		},

		scroll(direction) {
			this.chart.scroll(direction)
		},
	},
	computed: {
		...mapState({
			groups: state => {
				return state.forecast.hourly.reduce((groups, item) => {
					let key = formatDate(item.dt * 1000)

					;(groups[key] = groups[key] || []).push(item.temp)

					return groups
				}, {})
			},
		}),
	},
	watch: {
		groups(gropus) {
			this.chart.update(groups)
		},
	},
}
</script>


<style lang="scss" scoped>

#chart {
	// --radius: 16px;
	position: relative;
	// top: -1px; // dirty
	border-bottom-left-radius: var(--radius);
	border-bottom-right-radius: var(--radius);
	// overflow: visible;
	overflow: auto;
	scrollbar-width: none;
}

#chart::-webkit-scrollbar {
	display: none;
}

canvas {
	// border-radius: 8px;
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