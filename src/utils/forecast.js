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
