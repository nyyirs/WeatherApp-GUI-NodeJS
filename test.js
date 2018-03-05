var request = require('request');

var url = 'http://api.openweathermap.org/data/2.5/weather?q=Beau%20Bassin,MU&appid=c4d5c31b830298dec1b618109fc76555';

request(url, function (error, response, body) {

    let weather = JSON.parse(body)
    console.log (weather);
    let temp = JSON.stringify(weather.main.temp);
        let hum =  weather.main.humidity;
        let lat = weather.coord.lat;
        let lon = weather.coord.lon;
        let country = weather.sys.country
        console.log (country, lon, lat);
});