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
	<h3>{{ $d(date, 'weekday') }}</h3>
	<h4>{{ $d(date, 'date') }}</h4>
	<ul class="daytimes">
		<li v-for="(daytime, i) in daytimes" :key="i">
			{{ $t(daytime) }}:
		</li>
	</ul>
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
	position: relative;
	display: flex;
	flex-direction: column;
	width: min(100vw, var(--width));
	height: 100%;
	text-transform: lowercase;
	box-sizing: border-box;
	scroll-snap-align: start;

	&:before {
		content: '';
		position: absolute;
		top: 10px;
		left: -1px;
		bottom: 0;
		width: 1px;
		border-left: 1px dashed;
	}
}

h3 {
	padding-left: 10px;
	font-size: 42px;
}

h4 {
	margin-bottom: 10px;
	padding-left: 12px;
	font-size: 20px;
}

h3, h4 {
	font-weight: 400;
}

ul.daytimes {
	display: flex;

	li {
		width: 25%;
		font-size: 12px;
		box-sizing: border-box;
	}

	li:first-child {
		padding-left: 12px;
	}
}

</style>