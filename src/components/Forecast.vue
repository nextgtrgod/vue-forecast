<template>
<li class="forecast">

</li>
</template>


<script>
export default {
	name: 'Forecast',
}
</script>


<style lang="scss" scoped>

.forecast {
	width: 140px;
	height: 90px;
	border-bottom: 2px solid;
	background-color: #FFCD01;

	@media (min-width: 500px) {
		margin: 0 10px;
		border: 2px solid;
		border-radius: var(--radius);
	}
}

</style>