<template>
<div id="search">
	<input type="text" v-model="query" ref="input" @focus="focus">
	<button aria-label="search">
		<img src="../assets/images/search.svg" role="presentation">
	</button>
</div>
</template>


<script>
import API from '@/config'

export default {
	name: 'Search',
	data: () => ({
		query: 'Moscow',
	}),
	mounted() {
		// if (document.getElementById('google-places-api'))
		// 	return this.init()

		let script = document.createElement('script')

		script.onload = this.init
		script.src = API.autocomplete
		// script.id = 'google-places-api'

		document.body.appendChild(script)
	},
	methods: {
		init() {
			let autocomplete = new google.maps.places.Autocomplete(this.$refs['input'], { types: ['(cities)'] })

			google.maps.event.addListener(autocomplete, 'place_changed', () => {
				let place = autocomplete.getPlace()

				let latitude = place.geometry.location.lat()
				let longitude = place.geometry.location.lng()

				this.$emit('search', { latitude, longitude })

				document.title = place.name
			})
		},

		focus() {
			this.$refs['input'].select()
		},
	},
}
</script>


<style lang="scss" scoped>

#search {
	position: relative;

	@media (min-width: 500px) {
		margin-bottom: 15px;
	}

	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border: 2px solid;
		border-left: none;
		border-right: none;
		box-sizing: border-box;
		pointer-events: none;

		@media (min-width: 500px) {
			border-radius: var(--radius);
			border: 2px solid;
		}
	}
}

input {
	width: 100%;
	height: 50px;
	padding: 0 10px;
	font-size: 24px;
	font-weight: 700;
	background-color: rgba(255, 255, 255, .5);
	backdrop-filter: blur(4px);
	box-sizing: border-box;

	@media (min-width: 500px) {
		padding: 0 16px;
		border-radius: var(--radius);
	}
}

input::selection {
	background-color: #FFCD01;
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