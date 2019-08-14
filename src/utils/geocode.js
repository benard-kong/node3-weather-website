const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaW5idHczM24iLCJhIjoiY2p6OHBvZzI0MDJmbzNtbXBhZzE3bzhvZiJ9.CbHcvzrHO8AXtMYZCnRZIA&limit=1'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.', undefined);
        } else if (body.features.length === 0) {
            callback('Could not find coordinates for that location. Please try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;