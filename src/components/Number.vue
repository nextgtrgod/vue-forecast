<template>
<component :is="tag" class="number">
	<slot :value="innerValue"/>
</component>
</template>


<script>
import { Tween, autoPlay } from 'es6-tween'
autoPlay(true)

export default {
	props: {
		value: {
			type: Number,
		},
		tag: {
			type: String,
			default: 'div',
		},
	},
	data() {
		return {
			innerValue: this.value,
		}
	},
	watch: {
		value(next, prev) {
			new Tween({ value: prev })
				.to({ value: next }, 500)
				.on('update', ({ value }) => this.innerValue = ~~value)
				.on('complete', () => this.innerValue = next)
				.start()
		}
	}
}
</script>