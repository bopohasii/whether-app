const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use('/static', express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Whether app',
    author: 'Bohdan Pohasii'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Whether app',
    author: 'Bohdan Pohasii'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Whether app',
    author: 'Bohdan Pohasii'
  });
});

app.get('/whether', (req, res) => {
  if (!req.query.city) {
    return res.send({
      error: 'please provide address'
    })
  }


  geocode(req.query.city, (error, response, { location, latitude, longitude }) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, response, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      return res.send({
        location,
        ...forecastData
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'please provide search query'
    })
  }


  console.log(req.query);
  res.send({
    products: []
  });
});

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(port, () => {
  console.log('running..')
});