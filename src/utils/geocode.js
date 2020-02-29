const request = require('request');

const geocode = (address, callback) => {
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2F0aGlzaGtzayIsImEiOiJjazBzMW5ibmUwMjdnM2htbmY1NzVud3RiIn0.v1WningV8NJ72OyLYoW_wg&limit=1";

    request({ url: geocodeUrl, json: true }, (error, response) => {
        if (error) {
            callback('No internet connection - geocode', undefined);
        }
        else if (response.body.features.length === 0) {
            callback('Wrong input - geocode', undefined);
        }
        else {
            callback(undefined, { geo_latitude: response.body.features[0].center[1], geo_longitude: response.body.features[0].center[0] });
        }
    });

};

module.exports = geocode;