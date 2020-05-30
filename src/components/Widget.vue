<i18n>
ru:
 speed:
  metric: "м/с"
  imperial: "mph"
 pressure: "мм. рт. ст."
en:
 speed:
  metric: "m/s"
  imperial: "mph"
 pressure: "mmHg"
</i18n>


<template>
<section id="widget" :class="{ visible: today }">
	<template v-if="today">
		<div class="status">
			<icon :id="now.weather[0].id" :daytime="daytime"/>
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
				<img :src="item.icon" :style="item.style" alt="">
				<span :data-units="item.units">{{ item.value }}</span>
			</li>
		</ul>
	</template>
</section>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import Icon from '@/components/Icon'

import makeFavicon from '@/utils/makeFavicon'

export default {
	name: 'Widget',
	components: {
		Icon,
	},
	computed: {
		...mapState({
			city: state => state.city,
			units: state => state.units,
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
					icon: require('@/assets/images/raindrop.svg'),
				},
				wind: {
					value: Math.round(this.now.wind.speed),
					units: this.$t(`speed.${this.units}`),
					icon: require('@/assets/images/arrow.svg'),
					style: {
						transform: `rotate(${Math.round((this.now.wind.deg % 360) / 45) * 45}deg)`,
					},
				},
				pressure: {
					value: Math.round(this.now.main.pressure / 1.33322368),
					units: this.$t('pressure'),
					icon: require('@/assets/images/thermometer.svg'),
				},
				cloudiness: {
					value: this.now.clouds.all,
					units: '%',
					icon: require('@/assets/images/cloud.svg'),
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
	height: .8em;
	margin-bottom: -2px;
	padding: 0 10px;
	display: flex;
	align-items: flex-end;
	margin-top: auto;
	font-size: inherit;
	line-height: 1;
	text-align: right;
}

.status {
	width: 100%;
	max-width: 190px;
	height: 100%;
	max-height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	border-right: 1px dashed;
	box-sizing: border-box;
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
	padding-right: 10px;
	display: flex;
	flex-direction: column;
	margin-left: auto;
	font-size: 20px;

	@media (min-width: 500px) {
		padding-right: 30px;
	}

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

	img {
		flex-shrink: 0;
		width: 1em;
		height: 1em;
		margin-right: .35em;
		text-align: center;
	}

	img[src*='thermometer'] {
		height: 1.2em;
	}

	img[src*='arrow'] {
		height: .85em;
	}
}

</style>