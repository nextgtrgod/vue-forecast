
let checkBrowser = () => {
	let ua		= window.navigator.userAgent.toLowerCase()
	let msie	= ua.indexOf('msie')
	let trident	= ua.indexOf('trident')
	let edge	= ua.indexOf('edge')
	let moz		= ua.indexOf('firefox')
	let chr		= ua.indexOf('chrome')
	let saf		= ua.indexOf('safari')
	let root	= document.getElementsByTagName('html')[0]

	if (typeof window.orientation !== 'undefined') root.classList.add('mobile-device')

	if (msie > 0 || trident > 0 || edge > 0) return 'ie'
	else if (moz > 0) return 'firefox'
	else if (chr > 0) return 'chrome'
    else if (saf > 0) return 'safari'
}

module.exports = checkBrowser
