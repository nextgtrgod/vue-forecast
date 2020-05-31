<template>
<div id="search">
	<input type="text" v-model="query" ref="input">
	<button aria-label="ask location" @click="locate" ref="button">
		<img src="../assets/images/pin.svg" role="presentation">
	</button>
</div>
</template>


<script>
import { mapState } from 'vuex'
import API from '@/config'

export default {
	name: 'Search',
	data() {
		return {
			query: this.$store.state.coords.name,
		}
	},
	mounted() {
		let script = document.createElement('script')

		script.onload = this.init
		script.src = API.autocomplete(this.language)

		document.body.appendChild(script)
	},
	methods: {
		init() {
			let autocomplete = new google.maps.places.Autocomplete(this.$refs['input'], { types: ['(cities)'] })

			google.maps.event.addListener(autocomplete, 'place_changed', () => {
				let place = autocomplete.getPlace()

				if (!place.geometry) return

				let latitude = place.geometry.location.lat()
				let longitude = place.geometry.location.lng()

				this.$store.commit('setCoords', {
					latitude,
					longitude,
					name: place.name,
					full_name: place.formatted_address, 
				})
			})
		},

		locate() {
			this.$emit('locate', () => {
				this.$refs['button'].classList.remove('error')
				setTimeout(() => this.$refs['button'].classList.add('error'), 100)
			})
		},
	},
	computed: {
		...mapState({
			language: state => state.language,
		}),
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
		width: 32px;
		margin: auto;
	}

	&.error {
		animation: shake .4s;
	}
}

@keyframes shake {
    8%, 41% {
        transform: translateX(-8%);
    }

    25%, 58% {
        transform: translateX(8%);
    }

    75% {
        transform: translateX(-4%);
    }

    92% {
        transform: translateX(4%);
    }

    0%, 100% {
        transform: translateX(0);
    }
}


</style>