<i18n>
ru:
 speed: "м/с"
 pressure: "мм. рт. ст."
en:
 speed: "m/s"
 pressure: "mmHg"
</i18n>


<template>
<section id="widget" :class="{ visible: today }">
	<template v-if="today">
		<div class="status">
			<i :class="`wi wi-owm-${daytime}-${now.weather[0].id}`"/>
			<h2>{{ description }}</h2>
		</div>
		<div class="temperature">
			<h1>{{ temperature.current }}°</h1>
			<p>
				{{ temperature.min !== temperature.max ? `${temperature.min}..${temperature.max}°` : null }}
			</p>
		</div>
		<ul>
			<li v-for="(item, i) in info" :key="i">
				<i :class="item.icon"/>
				<span :data-units="item.units">{{ item.value }}</span>
			</li>
		</ul>
	</template>
</section>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import makeFavicon from '@/utils/makeFavicon'

let directions = ['up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'left', 'up-left']

export default {
	name: 'Widget',
	data: () => ({
		humidity: 72,
		wind: 2,
		pressure: 764,
		cloudiness: 56,
	}),
	computed: {
		...mapState({
			city: state => state.city,
		}),

		daytime() {
			let now = Date.now()

			return now > (this.city.sunrise * 1000) && now < (this.city.sunset * 1000)
				? 'day'
				: 'night'
		},

		...mapGetters({
			today: 'current',
		}),

		now() {
			return this.today[0]
		},

		description() {
			return this.now.weather[0].description
		},

		temperature() {
			let current = Math.round(this.now.main.temp)

			makeFavicon(`${current}°`, 'bold 128px jura')

			let { min, max } = this.today.reduce((range, forecast) => ({
				min: [ ...range.min, forecast.main.temp_min ],
				max: [ ...range.max, forecast.main.temp_max ],
			}), { min: [], max: [] })

			return {
				current: Math.round(this.now.main.temp),
				min: Math.round(Math.min(...min)),
				max: Math.round(Math.max(...max)),
			}
		},

		info() {
			return {
				humidity: {
					value: this.now.main.humidity,
					units: '%',
					icon: 'wi wi-raindrop',
				},
				wind: {
					value: Math.round(this.now.wind.speed),
					units: this.$t('speed'),
					icon: `wi wi-direction-${directions[Math.round((this.now.wind.deg % 360) / 45)]}`,
				},
				pressure: {
					value: Math.round(this.now.main.pressure / 1.33322368),
					units: this.$t('pressure'),
					icon: 'wi wi-thermometer',
				},
				cloudiness: {
					value: this.now.clouds.all,
					units: '%',
					icon: 'wi wi-cloud'
				},
			}
		},
	},
}
</script>


<style lang="scss" scoped>

#widget {
	height: 210px;
	padding: 15px 0;
	display: flex;
	align-items: center;
	font-size: 20px;
	color: #FFF;
	background-color: #000;
	user-select: none;
	box-sizing: border-box;
	overflow: hidden;
	opacity: 0;
	transition: opacity .3s;
	z-index: 1;

	&.visible {
		opacity: 1;
	}

	@media (min-width: 500px) {
		border-radius: var(--radius);
		margin-bottom: 15px;
	}
}

h1 {
	font-size: 80px;
	line-height: 1;
	letter-spacing: -0.05em;
}

h1 + p {
	height: 1em;
	margin-left: 5px;
	margin-bottom: 1em;
}

h2 {
	margin-top: auto;
	max-width: calc(100% - 20px);
	font-size: inherit;
	line-height: .8;
	text-align: right;
}

.status {
	width: 100%;
	max-width: 190px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding: 0 10px;
	border-right: 1px dashed;
	box-sizing: border-box;

	i {
		margin-top: 25px;
		font-size: 95px;
	}
}

.temperature {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	padding-left: 10px;
}

ul {
	width: 100%;
	max-width: 120px;
	padding-right: 30px;
	display: flex;
	flex-direction: column;
	margin-left: auto;
	font-size: 20px;

	li {
		display: flex;
		align-items: center;
		margin-bottom: .5em;

		&:last-child {
			margin-bottom: 0;
		}
	}

	span {
		line-height: 1;
	}

	span::after {
		content: attr(data-units);
		font-size: .6em;
		margin-left: .5ch;
		white-space: nowrap;
	}

	span[data-units="%"]::after {
		margin-left: 0;
		font-size: .7em;
	}

	i[class*="direction"] {
		transform: scale(1.625);
	}

	i {
		flex-shrink: 0;
		width: 1em;
		margin-right: .35em;
		text-align: center;
	}
}

</style>