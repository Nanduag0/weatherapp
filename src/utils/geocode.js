const request = require('request')

const geocode = (address, callback) => {
  const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmFuZHVhZzAiLCJhIjoiY2thOGQyMnJxMGJ6YzJzcDQ5dXAydDFjdiJ9.EyOD6IRaaeuPJO2Bte3eyw'

  request({ url: geocodeurl, json: true }, (error, response) => {
    if (error) {
      callback('Unable to conect to location services', undefined)
    } else if (response.body.features.length === 0) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
  })
}
/* geocode('Philadelphia',(error,data)=>
{
    console.log('error',error)
    console.log('Data',data)

}) */
module.exports = geocode
