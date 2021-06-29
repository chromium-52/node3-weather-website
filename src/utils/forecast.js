//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
    latitude +
    '&lon=' +
    longitude +
    '&exclude=minutely,hourly&appid=4ea2bcf3c7b11f352fcd3af12b138e49&units=metric';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.cod == 400) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        body.current.weather[0].description +
          '. It is currently ' +
          body.current.temp +
          ' degrees out. There is ' +
          body.current.clouds +
          '% cloud coverage'
      );
    }
  });
};

module.exports = forecast;
