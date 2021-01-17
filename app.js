var express = require("express");
var app = express();
var Twit = require('twit');
app.set("view engine", "ejs");
// require('dotenv/config');

var apikey = 'XXXX';
var apiSecret = 'XXXX';
var accessToken = 'XXXX';
var accessTokenSecret = 'XXXX';

config = {
    consumer_key:         apikey,
    consumer_secret:      apiSecret,
    access_token:         accessToken,
    access_token_secret:  accessTokenSecret,
}

// var T = new Twit({
//   consumer_key:         apikey,
//   consumer_secret:      apiSecret,
//   access_token:         accessToken,
//   access_token_secret:  accessTokenSecret,
// });

var T = new Twit(config);

app.get("/", function(req, res) {
    res.render("search"); 
});

app.get("/results", function(req, res){
    var query = req.query.search;
    T.get('search/tweets', { q: query, count: 10 }, function(err, data, response) {
        const tweets = data.statuses;
        // console.log(tweets);
        res.render("results", {data: tweets});
    });
});

app.listen(3000, process.env.IP, function(){
    console.log("Twitter app has tarted!");
});