const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Index.html");
})

app.post("/", function (req, res) {
    const query = req.body.cityName

    https.get("https://api.openweathermap.org/data/2.5/weather?zip=641658&q=" + query + "&appid=f8f2b9ab5596a415f8352d69160ce36f&units=metric", function (response) {


        response.on("data", function (data) {
            const WeatherData = JSON.parse(data);
            const temp = WeatherData.main.temp;
            const desc = WeatherData.weather[0].description;
            res.write("<p>the weather description is </p><h1>" + desc + "</h1>")
            res.write("<h1>the temperature in " + query + " is:" + temp + " degree celsius</h1>");
            res.send();

        });

    })

})

app.listen(3000, function () {
    console.log("server started");
});