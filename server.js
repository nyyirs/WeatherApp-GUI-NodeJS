const express = require('express');
const hbs = require('hbs');
var request = require('request');
const bodyParser = require('body-parser');

var app = express();

//use bodyParser to accept parameters from html input
app.use(bodyParser.urlencoded({ extended: true }));

//Register partials 
hbs.registerPartials(__dirname + '/views/partials');

//Set view engine to use HBS
app.set('view engine', 'hbs');

//Setup home page
app.get('/', (req, res) => {

    res.render('index.hbs');

});

app.post('/', function (req, res) {

    //Resigter a Helper (Function to be used in template) to fetch Weather API
    let city = encodeURIComponent(req.body.city);
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=c4d5c31b830298dec1b618109fc76555`;
    request(url , (err, respond, body) =>{

        if(err){
            res.render('index.hbs');
        } else {
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index_error.hbs');
              } else {
                let temp = weather.main.temp;
                let hum =  weather.main.humidity;
                let lat = weather.coord.lat;
                let lon = weather.coord.lon;
                let country = weather.sys.country;
                let city = weather.name;

                res.render('index.hbs', {
                    temp,
                    hum,
                    lat,
                    lon,
                    city,
                    country
                });
            }
        }
    });
})

//Run the Server
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});