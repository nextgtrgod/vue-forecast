<template>
<button class="ui-switch" :class="{ active: innerValue }" @click="toggle">
	<span>{{ labels[0] }}</span>
	<span>{{ labels[1] }}</span>
	<audio src="../assets/audio/click.mp3" preload="auto" hidden ref="audio"/>
</button>
</template>


<script>
export default {
	name: 'uiSwitch',
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		labels: {
			type: Array,
			default: () => [],
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
	position: relative;
	width: 72px;
	height: 44px;
	padding: 4px 6px;
	display: flex;
	align-items: center;
	justify-content: space-between;
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

		span:first-of-type {
			transform: scale(1);
		}

		span:last-of-type {
			transform: scale(0);
		}
	}

	&:after {
		content: '';
		position: absolute;
		top: 4px;
		left: 4px;
		width: 32px;
		height: 32px;
		background-color: currentColor;
		border-radius: 50%;
		transition: transform .15s;
	}
}

span {
	font-size: 26px;
	font-weight: 700;
	line-height: 1;
	transition: transform .15s;
}

span:first-of-type {
	transform: scale(0);
}

@media (prefers-reduced-motion: reduce) {
	.ui-switch::after {
		transition: none;
	}
}

</style>
