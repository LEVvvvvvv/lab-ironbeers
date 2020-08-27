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

hbs.registerPartials(__dirname + "/views/partials")

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async(req, res) => {
  let cervezas = await punkAPI.getBeers()
  cervezas.array = cervezas;
  cervezas.array.randomBeer = false;
  //console.log(cervezas)
  res.render('beers', {cervezas});
});

app.get('/randomBeer', async(req, res) => {
  let cerveza =  await punkAPI.getRandom()
  cerveza.array = cerveza;
  cerveza = cerveza[0];
  res.render('randomBeer', cerveza);
});

app.get('/specificBeer', async(req, res) => {
  let cerveza
  let id = req.query.id;
  cerveza =  await punkAPI.getBeer(id);
  cerveza = cerveza[0];
  res.render('specificBeer', cerveza);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
