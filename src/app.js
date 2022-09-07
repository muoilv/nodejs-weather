const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils.js/geocode')
const forecast = require('./utils.js/forecast')

// define paths for Express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Muoi'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title:'About',
        name: 'Muoi'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpText:'help Text',
        title:'Help',
        name: 'Muoi'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error :'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        errorMessage:'page not found',
        title:'404',
        name: 'Muoi'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})