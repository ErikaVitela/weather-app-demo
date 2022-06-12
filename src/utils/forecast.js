const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d1d1bd8f01eaf40d2fadb69795a2ba69&query=' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const { weather_descriptions: weather, temperature, precip, humidity, wind_speed } = body.current;
            const daysofWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            
            let dt = new Date();
            let day = daysofWeek[dt.getDay()];
            let hr = dt.getHours();
            let min = dt.getMinutes();
            if (min < 10) {
                min = "0" + min;
            }
            let ampm = "am";
            if( hr > 12 ) {
                hr -= 12;
                ampm = "pm";
            }
            callback(undefined, 'Weather on ' + day + ', ' + hr + ':' + min + ' ' + ampm + '\n' +
                weather[0] + ' Temperature: ' + temperature + 
                ' C, Precip: ' + precip + ' mm, Humidity: ' + humidity +
                ' %, Wind: ' + wind_speed + ' kmh');
        }
    });
};

module.exports = forecast;