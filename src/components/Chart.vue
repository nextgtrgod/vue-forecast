<template>
<div id="chart">
	<canvas ref="canvas"/>
</div>
</template>


<script>
import { mapState } from 'vuex'
import { Tween, autoPlay } from 'es6-tween'
import Chart from '@/modules/Chart'

autoPlay(true)

import rnd from '@/utils/random'

let getArray = length => {
	let arr = []

	for (let i = 0; i < length; i++)
		arr.push(rnd.range(0, 30))
	
	return arr
}

export default {
	name: 'Chart',
	async mounted() {
		let font = 'jura'

		await this.preload(font)

		this.chart = new Chart({
			canvas: this.$refs['canvas'],
			font,
		})

		this.values = getArray(50)
		this.chart.update(this.values)

		// temp
		document.addEventListener('keypress', ({ keyCode }) => {
			if (keyCode === 97) this.animate()
		})
	},
	methods: {
		preload(font) {
			return new Promise(resolve => {
				if (!('fonts' in document)) return resolve()

				document.fonts.load(`1em ${font}`).then(resolve)
			})
		},

		animate(to, from) {
			this.tween = new Tween(from)
				.to(to, 1000)
				.on('update', arr => this.chart.update(arr))
				.start()
		},
	},
	computed: {
		...mapState({
			forecast: state => state.forecast,
		}),
	},
	watch: {
		forecast(now, old) {
			let to = Object.values(now).reduce((arr, day) => (
				[...arr, ...day.map(weather => Math.round(weather.main.temp))]
			), [])

			let from = Object.values(old).reduce((arr, day) => (
				[...arr, ...day.map(weather => Math.round(weather.main.temp))]
			), [])

			let length = Math.min(to.length, from.length)

			to.length = length
			from.length = length

			this.animate(to, from)
		},
	},
}
</script>


<style lang="scss" scoped>

#chart {
	// --radius: 16px;

	position: relative;
	top: -1px; // dirty
	border-bottom-left-radius: var(--radius);
	border-bottom-right-radius: var(--radius);
	// border: 6px solid var(--color-text);
	overflow: auto;

	scrollbar-width: none;
}

#chart::-webkit-scrollbar {
	display: none;
}

canvas {
	height: 100px;
	background-color: #000;
	// border-radius: 8px;
}

</style>