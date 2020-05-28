<template>
<div class="ui-switch" :class="{ active: innerValue }" @click="toggle">
	<audio src="../assets/audio/click.mp3" preload="auto" hidden ref="audio"/>
</div>
</template>


<script>
export default {
	name: 'uiSwitch',
	props: {
		value: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			innerValue: this.value,
		}
	},
	methods: {
		toggle() {
			this.innerValue = !this.innerValue

			this.$refs['audio'].currentTime = 0
			this.$refs['audio'].play()
		}
	},
	watch: {
		value(newVal) {
			this.innerValue = newVal
		},
		innerValue(newVal) {
			this.$emit('input', newVal)
		},
	}
}
</script>


<style lang="scss" scoped>

.ui-switch {
	flex-shrink: 0;
	width: 72px;
	height: 44px;
	padding: 4px;
	border-radius: 28px;
	background-color: rgba(255, 255, 255, .5);
	backdrop-filter: blur(4px);
	border: 2px solid;
	box-sizing: border-box;
	cursor: pointer;

	&.active {
		&:after {
			transform: translate3d(28px, 0, 0);
		}
	}

	&:after {
		content: '';
		display: block;
		width: 32px;
		height: 32px;
		background-color: currentColor;
		border-radius: 50%;
		transition: transform .3s;
	}
}

</style>
