import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

let language = navigator.language.split('-')[0]

const i18n = new VueI18n({
	locale: language,
	fallbackLocale: 'ru',
	silentFallbackWarn: true,
})

export default i18n
