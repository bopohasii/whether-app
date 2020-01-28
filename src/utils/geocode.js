const request = require('request');
const qs = require('query-string');

const MB_TOKEN = 'pk.eyJ1IjoiYm9wb2hhc2lpIiwiYSI6ImNrNXRqYjg1djBsdDczcGxvM2JhZHprbTUifQ.WC2Ld5vZz1kXKXXrqrLQZg';

const getGeocodingUrl = (location, qp = {}) => {
  const qpString = qs.stringify(qp);

  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?${qpString}`;
};

const geocode = (city, cb) => {
  const url = getGeocodingUrl(city, {access_token: MB_TOKEN});

  request({url, json: true}, (error, response, body) => {
    if (error) {
      cb('Unable to connect to the internet', undefined);
    } else if (body.features.length === 0) {
      cb('Unable to find location', undefined);
    } else {
      const [primaryData] = body.features;
      const [longitude, latitude] = primaryData.center;
      const location = primaryData.place_name;

      cb(undefined, undefined, {
        longitude,
        latitude,
        location,
      });
    }
  });
};

module.exports = geocode;