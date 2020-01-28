const request = require('request');
const qs = require('query-string');

const getWeatherUrl = (latitude, longitude, qp = {}) => {
  const qpString = qs.stringify(qp);

  return `https://api.darksky.net/forecast/b9314c12be9da82e6da34a520fdcfa51/${latitude},${longitude}?${qpString}`;
};

const forecast = (latitude, longitude, cb) => {
  request({url: getWeatherUrl(latitude, longitude,), json: true}, (error, response, body) => {
    if (error) {
      cb('Unable to connect to the internet', undefined, undefined);
    }  else if (body.error) {
      cb('Unable to find location', undefined, undefined);
    } else {
      const { temperature, precipProbability } = body.currently;
      const { summary } = body.daily;

      cb(undefined, undefined, {
        summary,
        temperature,
        precipProbability,
      });
    }
  });
};

module.exports = forecast;