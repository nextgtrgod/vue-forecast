import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { language } from '@/config/settings'

Vue.use(VueI18n)

// if (document.documentElement.lang !== language)
// 	document.documentElement.lang = language


const dateTimeFormats = {
	'en': {
		'weekday': {
			weekday: 'long',
		},
		'date': {
			day: 'numeric',
			month: 'long',
		},
	},
	'ru': {
		'weekday': {
			weekday: 'long',
		},
		'date': {
			day: 'numeric',
			month: 'long',
		},
	}
}


const i18n = new VueI18n({
	locale: language.initial,
	fallbackLocale: language.options[0],
	dateTimeFormats,
	silentFallbackWarn: true,
})

export default i18n
