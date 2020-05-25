import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

import i18n from '@/config/i18n'

new Vue({
	store,
	i18n,
	render: function (h) { return h(App) }
}).$mount('#app')
