const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/39064473e644e39c72f3c19c3111ac4c/' + encodeURIComponent(latitude) + 
    ',' + encodeURIComponent(longitude) + '?units=si';
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, 
                body.daily.data[0].summary + " It is currently " + 
                body.currently.temperature + " degrees out. There is a " + 
                body.currently.precipProbability + "% chance of rain."
            );
        }
    });
}

module.exports = forecast;