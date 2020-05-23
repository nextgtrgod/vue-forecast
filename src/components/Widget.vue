<template>
<section id="widget">
	<div>
		<img src="">
		<h2>{{ description }}</h2>
	</div>
	<div>
		<h1>{{ temp.current }}°</h1>
		<p>{{ temp.min }}..{{ temp.max }}°</p>
	</div>
</section>
</template>


<script>
import { mapState } from 'vuex'

export default {
	name: 'Widget',
	mounted() {
		console.log(this.$store.state.language)
	},
	computed: {
		...mapState({
			data: state => state.weather[0],
		}),

		description() {
			return this.data.weather[0].description
		},

		temp() {
			return {
				current: Math.round(this.data.main.temp),
				min: Math.round(this.data.main.temp_min),
				max: Math.round(this.data.main.temp_max),
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
	margin: auto 10px 0 auto;
	max-width: calc(100% - 20px);
	font-size: inherit;
	line-height: 1;
	text-align: right;
}

div:nth-child(1) {
	max-width: 190px;
	height: 100%;
	display: flex;
	flex-direction: column;
	border-right: 1px dashed;
}

div:nth-child(2) {
	height: 100%;
	padding-left: 10px;
}

</style>