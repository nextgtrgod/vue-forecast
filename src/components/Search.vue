<template>
<form id="search">
	<input type="text" v-model="query">
	<button aria-label="search">
		<img src="../assets/images/search.svg" role="presentation">
	</button>
</form>
</template>


<script>
export default {
	name: 'Search',
	data: () => ({
		query: 'Moscow, Russia',
	}),
}
</script>


<style lang="scss" scoped>

#search {
	position: relative;

	@media (min-width: 500px) {
		margin-bottom: 15px;
	}
}

input {
	width: 100%;
	height: 50px;
	padding: 0 16px;
	font-size: 24px;
	font-weight: 700;
	background-color: rgba(255, 255, 255, .5);
	backdrop-filter: blur(4px);
	border-top: 2px solid;
	box-sizing: border-box;

	@media (min-width: 500px) {
		border-radius: var(--radius);
		border: 2px solid;
	}
}

button {
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	width: 50px;
	height: 50px;

	img {
		width: 45%;
		margin: auto;
	}
}

</style>