const request = require('request');

const forecast = (coordinates, callback) => {

    const forecastUrl = 'https://api.darksky.net/forecast/4f754590d1c26b975110ddabe36b401c/' + coordinates.latitude + ',' + coordinates.longitude;

    request({ url: forecastUrl, json: true }, (error, response) => {
        if (error) {
            callback('No internet connection - forecast', undefined);
        }
        else if (response.body.error) {
            callback('Wrong input - forecast', undefined);
        }
        else {
            //console.log('The place_name is: ' + response.body.timezone);
            //console.log('The temperature is: ' + response.body.currently.temperature);
            callback(undefined, 'The place_name is: ' + response.body.timezone + ', The temperature is: ' + response.body.currently.temperature);
        }
    });
};

module.exports = forecast;