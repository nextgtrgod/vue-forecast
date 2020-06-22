<template>
<div id="map"/>
</template>


<script>
import mapboxgl from 'mapbox-gl'
import { mapbox_api } from '@/config/keys'
import { mapState } from 'vuex'

mapboxgl.accessToken = mapbox_api

export default {
	name: 'Map',
	mounted() {
		this.map = new mapboxgl.Map({
			container: this.$el,
			style: 'mapbox://styles/nextgtrgod/ckbqfm8ae58i41ilmws8garao',
			center: [ this.coords.longitude, this.coords.latitude ],
			zoom: 16, // starting zoom,
			pitch: 60,
			antialias: false,
			interactive: false,
			attributionControl: false,
		})

		this.map.on('load', () => {

			this.rotateMap(0)

			// Insert the layer beneath any symbol layer.
			var layers = this.map.getStyle().layers;
			
			var labelLayerId;
			for (var i = 0; i < layers.length; i++) {
			if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
			labelLayerId = layers[i].id;
			break;
			}
			}
			
			this.map.addLayer({
				'id': '3d-buildings',
				'source': 'composite',
				'source-layer': 'building',
				'filter': ['==', 'extrude', 'true'],
				'type': 'fill-extrusion',
				'minzoom': 15,
				'paint': {
					'fill-extrusion-color': '#aaa',
				
					// use an 'interpolate' expression to add a smooth transition effect to the
					// buildings as the user zooms in
					'fill-extrusion-height': [
						'interpolate',
						['linear'],
						['zoom'],
						15,
						0,
						15.05,
						['get', 'height']
					],
					'fill-extrusion-base': [
						'interpolate',
						['linear'],
						['zoom'],
						15,
						0,
						15.05,
						['get', 'min_height']
					],
					'fill-extrusion-opacity': 0.6,
				}
			}, labelLayerId)
		})
	},
	methods: {
		rotateMap(t) {
			this.map.rotateTo((t / 100) % 360, { duration: 0 })
			requestAnimationFrame(this.rotateMap)
		},
	},
	computed: {
		...mapState({
			coords: state => state.coords,
		}),
	},
	watch: {
		coords(coords) {
			this.map.flyTo({
				center: [ coords.longitude, coords.latitude ],
				speed: 2,
				curve: 1,
				easing: t => t,
				// this animation is considered essential with respect to prefers-reduced-motion
				essential: true,
			})
		},
	}
}
</script>


<style lang="scss" scoped>

#map {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	opacity: .15;
	// z-index: 1;
}

</style>