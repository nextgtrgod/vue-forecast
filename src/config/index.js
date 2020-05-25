import key from './key'

export default {
	get: (language, coords) => `https://api.openweathermap.org/data/2.5/forecast?` +
		`lang=${language}` +
		`&units=metric` +
		`&appid=${key}` +
		`&lat=${coords.latitude}&lon=${coords.longitude}`
}
