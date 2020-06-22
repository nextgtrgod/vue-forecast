import i18n from '@/config/i18n'
import { units } from '@/config/settings'
import checkBrowser from '@/utils/checkBrowser'

const browser = checkBrowser()
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

document.documentElement.classList.add(browser)

// load static icons
if (reducedMotion || browser !== 'chrome') {
	let link = document.createElement('link')
	link.rel = 'stylesheet'
	link.href = 'weather-icons/weather-icons.css'
	document.head.appendChild(link)
}

let coords = null
try {
	let { latitude, longitude } = JSON.parse(localStorage.getItem('coords')) || {}
	if (latitude && longitude) coords = { latitude, longitude }
} catch (error) {
	console.warn('Error reading localStorage:', error)
}


export default {
	browser,
	reducedMotion,

	coords,
	language: i18n.locale,
	units: units.initial,

	forecast: null,
}
