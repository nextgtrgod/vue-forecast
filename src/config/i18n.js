import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

let supported = ['en', 'ru']

let language = supported.find(language => (
	language === localStorage.getItem('language'))
) || supported[0]

if (document.documentElement.lang !== language)
	document.documentElement.lang = language


const i18n = new VueI18n({
	locale: language,
	fallbackLocale: supported[0],
	silentFallbackWarn: true,
})

export default i18n
