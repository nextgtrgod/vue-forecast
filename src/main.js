import Vue from 'vue'
import App from './App.vue'
import i18n from '@/config/i18n'
import store from './store'

Vue.config.productionTip = false

Vue.directive('visible', (node, binding) => {
	node.style.visibility = !!binding.value ? 'visible' : 'hidden'
})

new Vue({
	i18n,
	store,
	render: function (h) { return h(App) }
}).$mount('#app')
