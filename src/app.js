const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
	title: 'Weather',
	name: 'Harsha'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
	title: 'About',
	name: 'Harsha'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
	helpText: "Some Helpful Text",
	title: 'Help',
	name: 'Harsha'
  })
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide a search term.'
		})
	}

	geocode(req.query.address, (error, {lat, lng, location} = {}) => {
		if (error) {
			return res.send({
				error
			})
		}
	
		forecast(lat, lng, (error, forecastData) => {
			if (error) {
				return res.send({
					error
				})
			}
	
			res.send({
				location,
				forecastData,
				address: req.query.address
			})
		})
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Harsha',
		errorMessage: 'Help Article Not Found.'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Harsha',
		errorMessage: 'Page Not Found.'
	})
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})