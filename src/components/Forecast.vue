<i18n>
en:
 morning: "morning"
 day: "day"
 evening: "evening"
 night: "night"
ru:
 morning: "утром"
 day: "днем"
 evening: "вечером"
 night: "ночью"
</i18n>

<template>
<li class="forecast">
	<ul class="daytimes">
		<li v-for="(daytime, i) in daytimes" :key="i">
			{{ $t(daytime) }}
		</li>
	</ul>
	<h3>{{ $d(date, 'weekday') }}</h3>
	<h4>{{ $d(date, 'date') }}</h4>
</li>
</template>


<script>
export default {
	name: 'Forecast',
	props: {
		date: {
			type: Number,
			required: true,
		}
	},
	data: () => ({
		daytimes: ['morning', 'day', 'evening', 'night'],
	}),
}
</script>


<style lang="scss" scoped>
@import '@/styles/variables';

.forecast {
	display: flex;
	flex-direction: column;
	width: min(100vw, var(--width));
	padding-bottom: 18px;
	// background-color: #31C0D1;
	text-transform: lowercase;
	box-sizing: border-box;
	scroll-snap-align: start;
}

ul.daytimes {
	display: flex;

	li {
		width: 25%;
		font-size: 12px;
		box-sizing: border-box;
	}

	li:first-child {
		padding-left: 7px;
	}
}

h4 {
	padding-left: 5px;
}

h3 {
	padding-left: 4px;
}

h3, h4 {
	font-weight: 400;
}

h3 {
	margin-top: auto;
	font-size: 42px;
	line-height: 1;
}

h4 {
	font-size: 20px;
	margin-left: 2px;
}

</style>