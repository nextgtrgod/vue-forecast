<template>
<div class="ui-switch" :class="{ active: innerValue }" @click="toggle"/>
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
	transition: all .3s;
	cursor: pointer;

	&.active {
		&:after {
			transform: translateX(28px);
		}
	}

	&:after {
		content: '';
		display: block;
		width: 32px;
		height: 32px;
		background-color: currentColor;
		border-radius: 50%;
		transition: background-color .2s, transform .3s;
		will-change: background-color, transform;
	}
}

</style>
