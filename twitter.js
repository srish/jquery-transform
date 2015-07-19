// Load the http module to create an http server.
var express = require('express');
var app = express();
var path = require('path');
var Twit = require('twit');

//Get this data from your twitter apps dashboard
var T = new Twit({
    consumer_key: 'consumer_key',
    consumer_secret: 'consumer_secret',
    access_token: 'access_token',
    access_token_secret: 'access_token_secret'
});

//
//  get the list of user id's that follow @srish_aka_tux
//
T.get('followers/ids', { screen_name: 'srish_aka_tux' },  function (err, data, response) {
  console.log(JSON.stringify(data, null, 2));
})

app.engine('.ejs', require('ejs').__express);

// routing for the homepage
app.get("/", function(req, res) {
    res.render('index.ejs', {
    });
});

app.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
