import { open_weather_api, google_places_api } from '@/config/keys'

export default {
	forecast: (coords, language, units) => `https://api.openweathermap.org/data/2.5/onecall` +
		`?lang=${language}` +
		// `&units=${units}` +
		`&exclude=minutely,hourly` +
		`&lat=${coords.latitude}&lon=${coords.longitude}` +
		`&appid=${open_weather_api}`,
	
	autocomplete: language => `https://maps.googleapis.com/maps/api/js?&libraries=places&types=(cities)` +
		`&language=${language}` +
		`&key=${google_places_api}`
}
