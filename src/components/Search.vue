<template>
<div id="search">
	<input type="text" v-model="query" ref="input">
	<button aria-label="ask location" @click="locate" :disabled="loading" ref="button">
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
			query: '',
			loading: false,
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			return new Promise(resolve => {
				let prev = document.getElementById('google-maps-api')
				if (prev) {
					document.body.removeChild(prev)
					delete google.maps
				}
	
				let script = document.createElement('script')
				script.id = 'google-maps-api'
	
				script.onload = () => {
					this.autocomplete = new google.maps.places.Autocomplete(this.$refs['input'], { types: ['(cities)'] })
					this.geocoder = new google.maps.Geocoder()

					google.maps.event.addListener(this.autocomplete, 'place_changed', this.search)

					resolve()
	
					if (this.coords) this.getCity()
				}
				script.src = API.autocomplete(this.language)
	
				document.body.appendChild(script)
			})
		},

		search() {
			let place = this.autocomplete.getPlace()

			if (!place.geometry) return

			let latitude = place.geometry.location.lat()
			let longitude = place.geometry.location.lng()

			this.$store.commit('setCoords', {
				latitude,
				longitude,
				name: place.formatted_address,
			})
		},

		getCity() {
			let options = {
				location: new google.maps.LatLng(this.coords.latitude, this.coords.longitude)
			}

			this.geocoder.geocode(options, (results, status) => {
				if (!status === 'OK') return

				let city = results.find(r => r.types.includes('locality'))

				if (!city) return

				document.title = city.formatted_address
				this.query = city.formatted_address
			})
		},

		locate() {
			this.loading = true

			this.$emit(
				'locate',
				() => {
					this.loading = false
					this.getCity()
				},
				() => {
					this.loading = false
					this.$refs['button'].classList.remove('error')
					setTimeout(() => this.$refs['button'].classList.add('error'), 100)
				},
			)
		},
	},
	computed: {
		...mapState({
			language: state => state.language,
			coords: state => state.coords,
		}),
	},
}
</script>


<style lang="scss" scoped>

#search {
	position: relative;
	display: flex;
	background-color: rgba(255, 255, 255, .5);
	border-radius: var(--radius);
	backdrop-filter: blur(4px);

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
	padding-left: 10px;
	font-size: 24px;
	font-weight: 700;
	text-overflow: ellipsis;
	box-sizing: border-box;

	@media (min-width: 500px) {
		padding-left: 16px;
	}
}

input::selection {
	background-color: #FFCD01;
}

button {
	position: relative;
	width: 50px;
	height: 50px;
	transition: opacity .2s;

	&:disabled {
		animation: bounce 1.5s linear infinite;
		pointer-events: none;
	}

	&.error {
		animation: shake .4s;
	}

	img {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 32px;
	}
}

@keyframes bounce {
	25% {
		transform: translate3d(0, -2.5%, 0);
	}

	50% {
		transform: translate3d(0, 0, 0);
	}

	75% {
		transform: translate3d(0, 2.5%, 0);
	}

	100% {
		transform: translate3d(0, 0, 0);
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