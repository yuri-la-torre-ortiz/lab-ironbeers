const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then((responseFromAPI) => {
    //Iteration 3.2  'allbeers' is key we create & used in beers.hbs, along with value 'responseFromAPI'
    res.render('beers' /*this refers to our beers.hbs file*/, {allbeers: responseFromAPI});
  })
  .catch(error => console.log(error));
  });

// Iteration 4.1 & most of 4.2
app.get('/random-beer', (req, res) => {
    punkAPI.getRandom().then((responseFromAPI) => {
    console.log(responseFromAPI);
    res.render('random-beer' /* our .hbs file */, {randombeer /*this key is used in random-beer.hbs*/: responseFromAPI});
  })
  .catch(error => console.log(error)); 
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
