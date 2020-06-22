<i18n>
ru:
 location: "Ваше расположение"
en:
 location: "Your location"
</i18n>


<template>
<section id="search">
	<input type="text" v-model="query" ref="input">
	<button @click="locate" :disabled="loading" :title="$t('location')" ref="button">
		<img src="@/assets/images/pin.svg" role="presentation">
	</button>
</section>
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
	async mounted() {
		await this.init()
		if (!this.coords) this.locate()
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

		async locate(resolve, reject) {
			this.loading = true

			try {
				let { coords } = await new Promise((resolve, reject) => {
					navigator.geolocation.getCurrentPosition(resolve, reject)
				})

				this.$store.commit('setCoords', {
					latitude: coords.latitude,
					longitude: coords.longitude,
				})

				await this.getCity()

			} catch (error) {
				this.$refs['button'].classList.remove('error')
				setTimeout(() => this.$refs['button'].classList.add('error'), 100)
			}

			this.loading = false
		},

		getCity() {
			return new Promise((resolve, reject) => {

				let options = {
					location: new google.maps.LatLng(this.coords.latitude, this.coords.longitude)
				}
	
				this.geocoder.geocode(options, (results, status) => {
					if (!status === 'OK' || !results) return reject()

					let city = results.find(r => r.types.includes('locality'))

					if (!city) return reject()
	
					this.query = city.formatted_address
					this.$store.commit('setCity', city.formatted_address)

					resolve()
				})
			})
		},

		search() {
			let place = this.autocomplete.getPlace()

			if (!place.geometry) return

			let latitude = place.geometry.location.lat()
			let longitude = place.geometry.location.lng()

			this.$store.commit('setCoords', { latitude, longitude })
			this.$store.commit('setCity', place.formatted_address)
		},
	},
	computed: {
		...mapState({
			coords: state => state.coords,
			language: state => state.language,
		}),
	},
}
</script>


<style lang="scss" scoped>
@import '@/styles/variables';

#search {
	position: relative;
	display: flex;
	background-color: rgba(255, 255, 255, .5);
	border-radius: var(--radius);
	backdrop-filter: blur(4px);

	@media (min-width: $app-width) {
		margin-bottom: 15px;
		padding-right: 2px;
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

		@media (min-width: $app-width) {
			border-radius: var(--radius);
			border: 2px solid;
		}
	}
}

input {
	width: 100%;
	height: 50px;
	padding-left: 8px;
	font-size: 24px;
	font-weight: 700;
	text-overflow: ellipsis;
	box-sizing: border-box;

	@media (min-width: $app-width) {
		padding-left: 16px;
	}
}

input::selection {
	background-color: #FFCD01;
}

button {
	flex-shrink: 0;
	position: relative;
	width: 40px;
	height: 50px;
	user-select: none;

	@media (min-width: $app-width) {
		width: 50px;
	}

	&:disabled img {
		animation-play-state: running;
		pointer-events: none;
	}

	&.error img {
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
		animation-name: zoom;
		animation-duration: .75s;
		animation-timing-function: ease-in-out;
		animation-direction: alternate;
		animation-iteration-count: infinite;
		animation-play-state: paused;
	}
}

@keyframes zoom {
	to {
		transform: scale(1.15);
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