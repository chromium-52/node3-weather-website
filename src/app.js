const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// sets a value for a given express setting
app.set('view engine', 'hbs');
// sets the views directory to use (default is /views)
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Kenny Jung',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Kenny Jung',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Kenny Jung',
  });
});

// let's us configure what the server should do when someone tries to get the resource at a specific url
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address!' });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }

        // sends something back to the requester
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Kenny Jung',
    errorMessage: 'Help article not found',
  });
});

// sets up the 404 page - * is wildcard, any address that hasn't been matched
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Kenny Jung',
    errorMessage: 'Page not found',
  });
});

const port = process.env.PORT || 3000;

// starts up the server
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
