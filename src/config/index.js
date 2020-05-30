import { open_weather_api, google_places_api } from '@/config/keys'

export default {
	forecast: (coords, language, units) => `https://api.openweathermap.org/data/2.5/forecast?` +
		`lang=${language}` +
		`&units=${units}` +
		`&appid=${open_weather_api}` +
		`&lat=${coords.latitude}&lon=${coords.longitude}`,
	
	autocomplete: `https://maps.googleapis.com/maps/api/js?&libraries=places&types=(cities)&key=${google_places_api}`
}
