<i18n>
en:
 now: "Temperature now"
 feels-like: "feels like"
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
ru:
 now: "Температура сейчас"
 feels-like: "ощущается как"
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
</i18n>


<template>
<div id="weather" :class="{ visible: today }">
	<div class="status">
		<icon :id="icon.id" :daytime="icon.daytime" class="icon"/>
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
</template>


<script>
import { mapState } from 'vuex'
import Icon from '@/components/Icon'

import convert from '@/utils/convert'
import makeFavicon from '@/utils/makeFavicon'

export default {
	name: 'Weather',
	components: {
		Icon,
	},
	computed: {
		...mapState({
			units: state => state.units,
			current: state => state.forecast.current,
			today: state => (state.forecast.daily || [])[0],
		}),

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
@import '@/styles/variables';

#weather {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	font-size: 16px;
	padding: .75em 0;
	box-sizing: border-box;
	// pointer-events: none;

	@media (min-width: 375px) {
		font-size: 18px;
	}

	@media (min-width: $app-width) {
		font-size: 20px;
	}
}

h1 {
	font-size: 4.5em;
	line-height: .95;
	letter-spacing: -0.05em;
}

h2 {
	margin-bottom: -2px;
	padding: 0 10px;
	display: flex;
	align-items: flex-end;
	margin-top: auto;
	font-size: 1em;
	height: .8em;
	line-height: 1;
	text-align: right;
}

.status {
	width: 100%;
	max-width: 9em;
	height: 100%;
	min-height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	border-right: 1px dashed;
	box-sizing: border-box;
}

.icon {
	height: 150px;
}

.temp {
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: 1.25em;
	height: 100%;
	padding-left: 10px;

	@media (min-width: $app-width) {
		font-size: 1em;
	}

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
	display: none;
	width: 100%;
	max-width: 105px;

	@media (min-width: 465px) {
		display: flex;
		flex-direction: column;
		margin-left: auto;
	}

	@media (min-width: $app-width) {
		max-width: 140px;
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