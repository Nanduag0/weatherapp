/*
const path = require('path')

const express = require('express')
// const hbs=require('hbs')
const geocode = require('./utils/geocode')
const app = express()
const forecast = require('./utils/forecast')
console.log(__dirname)
// Define path for express config \

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../src/templates/views')
// const partialspath=path.join(__dirname,'../templates/partials')
// setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
// hbs.registerPartial(partialspath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))
*/

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index',
    {
      title: 'Weather app',
      name: 'Nandini Agarwal'
    })
})
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error: 'You  must provide an addresss' })
    }
    console.log(latitude)// Working properly
    console.log(longitude)// Working proprly
    forecast({ latitude, longitude }, (error, forecastdata) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send(
        {
          forecast: forecastdata,
          location,
          address: req.query.address,
          latitude: latitude,
          longitude: longitude
        }
      )
    })
  })
})

app.get('/products', (req, res) => {
  if (req.query.search) {
    return res.send({
      error: 'You musr provide  a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: {}
  })
})
app.get('/about', (req, res) => {
  res.render('about',
    {
      title: 'About me',
      name: 'Nandini Agarwal'
    })
})
app.get('/help/*', (req, res) => {
  res.render('404', {
    errormessage: 'Not found'
  })
})

app.get('*', (req, res) => {
  res.send('My 404 page')
})

app.get('/help', (req, res) => {
  res.send('hello!!!')
})
app.listen(port, () => {
  console.log('Server is up on port 3000')
})

// app.com
// app.com/help
// app.com/about
