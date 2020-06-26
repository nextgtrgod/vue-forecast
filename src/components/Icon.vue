<template>
<div class="icon">
	<transition name="slide">
		<img v-if="animation" :src="icon" :key="icon" alt="">
		<i v-else :class="icon" aria-hidden=""/>
	</transition>
</div>
</template>


<script>
import { mapState } from 'vuex'
import icons from '@/config/icons'

export default {
	name: 'Icon',
	props: {
		id: {
			type: Number,
		},
		daytime: {
			type: String,
			default: 'day',
		},
	},
	computed: {
		...mapState({
			animation: state => state.browser === 'chrome' && !state.reducedMotion,
		}),

		icon() {
			if (!this.animation) return `wi wi-owm-${this.daytime}-${this.id}`

			try {
				return require(`@/assets/images/icons/${icons[this.id]}_${this.daytime}.svg`)
			} catch {
				console.log(`no icon for id ${this.id}`)
				return require(`@/assets/images/icons/sun_${this.daytime}.svg`)
			}
		},
	},
}
</script>


<style lang="scss" scoped>
@import '@/styles/mixins';

.slide-enter-active,
.slide-leave-active {
	transition-property: transform, opacity;
	transition-timing-function: ease-in-out;
}
.slide-enter-active,
.slide-leave-active {
	transition-duration: .5s;
}
.slide-enter {
	transform: translateY(100%);
}
.slide-leave-to {
	transform: translateY(-100%);
}

.slide-enter,
.slide-leave-to {
	opacity: 0;
}

.icon {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	text-align: right;
	backface-visibility: hidden;
}

i {
	padding-right: 10px;
	font-size: 85px;
}

img {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	transform: translateZ(0);
}

</style>