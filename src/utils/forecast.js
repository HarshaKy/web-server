const request = require('request');

var {darksky} = require('./../keys/keys.js');

const forecast = (lat, lng, callback) => {
  var url = `https://api.darksky.net/forecast/${darksky}/${lat},${lng}?units=si`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh} degrees with a low of ${body.daily.data[0].temperatureLow} degrees. There is a ${body.currently.precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast
