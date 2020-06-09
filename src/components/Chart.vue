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

		// animate(to, from) {
		// 	this.tween = new Tween(from)
		// 		.to(to, 1000)
		// 		.on('update', arr => this.chart.update(arr))
		// 		.start()
		// },
	},
	computed: {
		...mapState({
			values: state => {
				let values = Object.values(state.forecast).reduce((arr, day) => (
					[...arr, ...day.map(weather => Math.round(weather.main.temp))]
				), [])

				return values
			},
		}),
	},
	watch: {
		values(to, from) {
			// this.chart.update(to)
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
	// overflow: auto;
	overflow: hidden;
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