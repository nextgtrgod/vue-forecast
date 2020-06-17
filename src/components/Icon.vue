<template>
<div class="icon">
	<img v-if="animation" :src="icon" alt="">
	<i v-else :class="icon" aria-hidden=""/>
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
			reducedMotion: state => state.reducedMotion,
			browser: state => state.browser,
		}),

		animation() {
			return !this.reducedMotion && this.browser === 'chrome'
		},

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

.icon {
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
	height: 100%;
	transform: translateZ(0);
}

</style>