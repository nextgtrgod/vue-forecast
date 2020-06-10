<i18n>
ru:
 now: "Температура сейчас"
 feels-like: "но ощущается как"
 humidity: "Влажность"
 wind:
  title: "Направление и скорость ветра"
  units:
   metric: "м/с"
   imperial: "mph"
 pressure:
  title: "Давление"
  units: "мм. рт. ст."
 cloudiness: "Облачность"
en:
 now: "Temperature now"
 feels-like: "but feels like"
 humidity: "Humidity"
 wind:
  title: "Wind direction and speed"
  units:
   metric: "m/s"
   imperial: "mph"
 pressure:
  title: "Pressure"
  units: "mmHg"
 cloudiness: "Cloudiness"
</i18n>


<template>
<section id="widget" :class="{ visible: today }">
	<div v-if="today" class="content">
		<div class="status">
			<icon :id="icon.id" :daytime="icon.daytime"/>
			<h2>{{ icon.description }}</h2>
		</div>
		<div class="temp">
			<h1 :title="$t('now')">{{ temp.current }}°</h1>
			<span v-show="temp.current !== temp.feels">
				{{ $t('feels-like') }} <strong>{{ temp.feels }}°</strong>
			</span>
			<p>
				{{ temp.min !== temp.max ? `${temp.min}..${temp.max}°` : null }}
			</p>
		</div>
		<ul>
			<li v-for="(item, i) in info" :key="i" :title="item.title">
				<img :src="item.icon" :style="item.style" alt="">
				<span :data-units="item.units">{{ item.value }}</span>
			</li>
		</ul>
	</div>
	<chart v-if="today"/>
</section>
</template>


<script>
import { mapState } from 'vuex'
import Icon from '@/components/Icon'
import Chart from '@/components/Chart'

import convert from '@/utils/convert'
import makeFavicon from '@/utils/makeFavicon'

export default {
	name: 'Widget',
	components: {
		Icon,
		Chart,
	},
	computed: {
		...mapState({
			units: state => state.units,
			current: state => state.forecast.current,
			today: state => (state.forecast.daily || [])[0],
		}),

		daytime() {
			let now = Date.now()

			return now > (this.current.sunrise * 1000) && now < (this.current.sunset * 1000)
				? 'day'
				: 'night'
		},

		icon() {
			let now = Date.now()

			let daytime = now > (this.current.sunrise * 1000) && now < (this.current.sunset * 1000)
				? 'day'
				: 'night'
	
			return {
				id: this.current.weather[0].id,
				daytime,
				description: this.current.weather[0].description,
			}
		},

		temp() {
			let current = convert.temp(this.current.temp)

			makeFavicon(`${current}°`, 'bold 128px jura')

			return {
				current,
				feels: convert.temp(this.current.feels_like),
				min: convert.temp(this.today.temp.min),
				max: convert.temp(this.today.temp.max),
			}
		},

		info() {
			return {
				humidity: {
					value: this.current.humidity,
					units: '%',
					icon: require('@/assets/images/raindrop.svg'),
					title: this.$t('humidity'),
				},
				wind: {
					value: convert.speed(this.current.wind_speed),
					units: this.$t(`wind.units.${this.units}`),
					icon: require('@/assets/images/arrow.svg'),
					style: {
						transform: `rotate(${Math.round((this.current.wind_deg % 360) / 45) * 45}deg)`,
					},
					title: this.$t('wind.title'),
				},
				pressure: {
					value: Math.round(this.current.pressure / 1.33322368),
					units: this.$t('pressure.units'),
					icon: require('@/assets/images/thermometer.svg'),
					title: this.$t('pressure.title'),
				},
				cloudiness: {
					value: this.current.clouds,
					units: '%',
					icon: require('@/assets/images/cloud.svg'),
					title: this.$t('cloudiness'),
				},
			}
		},
	},
}
</script>


<style lang="scss" scoped>

$width: 520px;

#widget {
	color: #FFF;
	font-size: 0;
	opacity: 0;
	transition: opacity .3s;
	user-select: none;
	box-sizing: border-box;
	// overflow: hidden;
	z-index: 1;

	&.visible {
		opacity: 1;
	}
}

.content {
	position: relative;
	height: 180px;
	display: flex;
	align-items: center;
	padding-top: 15px;
	font-size: 20px;
	background-color: #000;
	box-sizing: border-box;
	z-index: 1;

	@media (min-width: 500px) {
		border-top-left-radius: var(--radius);
		border-top-right-radius: var(--radius);
	}
}

h1 {
	font-size: 80px;
	line-height: .95;
	letter-spacing: -0.05em;
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
	max-width: 180px;
	height: 100%;
	max-height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	border-right: 1px dashed;
	box-sizing: border-box;
}

.temp {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	padding-left: 10px;

	span {
		margin-left: 4px;
		margin-bottom: .5em;
		font-size: .75em;
		white-space: nowrap;
	}

	strong {
		font-size: 1.2em;
	}

	p {
		height: 1em;
		margin-left: 4px;
		margin-bottom: 1em;
	}
}

ul {
	width: 100%;
	max-width: 120px;
	padding-right: 10px;
	display: flex;
	flex-direction: column;
	margin-left: auto;
	font-size: 20px;

	@media (min-width: $width) {
		padding-right: 20px;
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