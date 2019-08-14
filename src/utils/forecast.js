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
            console.log(body.daily.data);
            callback(undefined, 
                body.daily.data[0].summary + " It is currently " + 
                body.currently.temperature + "° out. There is a " + 
                body.currently.precipProbability + "% chance of rain.\n" +
                "The high for today is " + body.daily.data[0].temperatureHigh + "°, " +
                "and the low for today is " + body.daily.data[0].temperatureLow + "°."
            );
        }
    });
}

module.exports = forecast;