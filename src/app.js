const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000; //For heroku server port

const publicPathDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicPathDirectory));
app.use(express.static(viewsPath));

hbs.registerPartials(partialPath);

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Index',
        name: 'Dynamic Name',
        by: 'Sat'
    })
});

app.get('/movie', (req, res) => {

    console.log(req.query);

    if (!req.query.title) {
        //res.send({  //Cannot set headers after they are sent to the client - bcz response will send two times to the client
        return res.send({   //function execution stops here due to 'return' statement
            error: 'You must provide movie name'
        })
    }

    res.send({
        movie: []
    });
});

app.get('/dummyweather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address'
        });
    }

    res.send({
        weather: [{ address: req.query.address }]
    });
});

app.get('/realweather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address'
        });
    }

    geocode(req.query.address, (error, geocodeData = {}) => {
        if (error) {
            return res.send({ error });
        }
        else {
            forecast({ latitude: geocodeData.geo_latitude, longitude: geocodeData.geo_longitude }, (error, forecastData) => {
                if (error) {//If no data from forecast or if there was a error.
                    return res.send({ error });
                }
                console.log('geocodeData:', geocodeData);
                console.log('forecastData:', forecastData);

                res.send({
                    forecast: forecastData,
                    address: req.query.address
                });
            });
        }

    });


});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        details: 'Dynamic Details',
        by: 'Raj'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        help: 'Dynamic Help',
        by: 'Sri'
    })
});

app.get('/about/*', (req, res) => { //Wild card routes
    res.render('404', {
        title: 'About',
        page: 'About',
        by: 'Sri'
    })
});

app.get('/help/*', (req, res) => { //Wild card routes
    res.render('404', {
        title: 'Help',
        page: 'Help',
        by: 'Sri'
    })
});

app.get('/*', (req, res) => { //Wild card routes
    res.render('404', {
        title: 'Main',
        page: 'Main',
        by: 'Sri'
    })
});


app.listen(port, () => {
    console.log('Server started at' + port);
});
