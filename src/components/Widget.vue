<i18n>
ru:
 speed: "м/с"
 pressure: "мм. рт. ст."
en:
 speed: "m/s"
 pressure: "mmHg"
</i18n>


<template>
<section id="widget" :class="{ visible: data }">
	<template v-if="data">
		<div class="status">
			<i :class="`wi wi-owm-${daytime}-${now.weather[0].id}`"/>
			<h2>{{ description }}</h2>
		</div>
		<div class="temperature">
			<h1>{{ temperature.current }}°</h1>
			<p>{{ temperature.min }}..{{ temperature.max }}°</p>
		</div>
		<ul>
			<li v-for="(item, i) in info" :key="i" :data-units="item.units">{{ item.value }}</li>
		</ul>
	</template>
</section>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import makeFavicon from '@/utils/makeFavicon'

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
			data: 'current',
		}),

		now() {
			return this.data[0]
		},

		description() {
			return this.now.weather[0].description
		},

		temperature() {
			let current = Math.round(this.now.main.temp)

			makeFavicon(`${current}°`, 'bold 128px jura')

			return {
				current,
				min: 0,
				max: 0,
			}
		},

		info() {
			return {
				humidity: {
					value: this.now.main.humidity,
					units: '%',
				},
				wind: {
					value: this.now.wind.speed,
					units: this.$t('speed'),
				},
				pressure: {
					value: Math.round(this.now.main.pressure / 1.33322368),
					units: this.$t('pressure'),
				},
				cloudiness: {
					value: this.now.clouds.all,
					units: '%',
				},
			}
		},
	},
}
</script>


<style lang="scss" scoped>

#widget {
	display: flex;
	align-items: center;
	height: 210px;
	padding: 15px 0;
	font-size: 21px;
	color: #FFF;
	background-color: #000;
	user-select: none;
	box-sizing: border-box;
	opacity: 0;
	transition: opacity .3s;

	&.visible {
		opacity: 1;
	}

	@media (min-width: 500px) {
		border-radius: var(--radius);
		margin-bottom: 15px;
	}
}

h1 {
	margin-top: 35px;
	font-size: 75px;
	line-height: 1;
}

h1 + p {
	margin-left: 5px;
}

h2 {
	margin-top: auto;
	max-width: calc(100% - 20px);
	font-size: inherit;
	line-height: 1;
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
	height: 100%;
	padding-left: 10px;
}

ul {
	display: inline-flex;
	flex-direction: column;
	margin-left: auto;
	padding-right: 50px;
	font-size: 21px;

	li {
		margin-bottom: 8px;
	}

	li::after {
		content: attr(data-units);
		font-size: .6em;
		margin-left: .5ch;
	}

	li[data-units="%"]::after {
		margin-left: 0;
		font-size: .7em;
	}
}

</style>