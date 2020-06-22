<template>
<canvas id="background"/>
</template>


<script>
import { mapState } from 'vuex'
import Sketch from '@/modules/Sketch'

export default {
	name: 'Background',
	mounted() {
		if (!this.reducedMotion) this.sketch = new Sketch(this.$el)
	},
	computed: {
		...mapState({
			reducedMotion: state => state.reducedMotion,
		}),
	},
}
</script>


<style scoped>

#background {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	pointer-events: none;
}

</style>