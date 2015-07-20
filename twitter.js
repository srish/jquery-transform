// Load the http module to create an http server.
var express = require('express');
var app = express();
var path = require('path');
var Twit = require('twit');
var async = require('async');
var twitter = require('twitter');
var bodyParser = require('body-parser');
_ = require('underscore')._;

var followers = [];
var follower_data = [];
var follower_profile_url = [];

//Get this data from your twitter apps dashboard
var T = new Twit({
    consumer_key: 'consumer_key',
    consumer_secret: 'consumer_secret',
    access_token: 'access_token',
    access_token_secret: 'access_token_secret'
});

app.engine('.ejs', require('ejs').__express);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use(express.static(__dirname + '/public'));

// routing for the homepage
app.post("/twitter_followers", function(req, res) {
 
    T.get('followers/ids', { screen_name: req.body.name, count: 30},  function (err, data, response) {
        followers = data.ids;

        async.each(followers, function(follower_id, callback) {

            T.get('users/lookup', { user_id: follower_id }, function(err, data, response) {
                follower_data.push(data[0].profile_image_url.replace("_normal", "")); 
                follower_profile_url.push("http://twitter.com/" + data[0].screen_name); 
            });

            callback(); // show that no errors happened

        }, function(err) {
            if(err) {
                console.log("There was an error" + err);
            } else {
                console.log("Loop is done");

                res.render('twitter_followers.ejs', {
                    follower_data: follower_data,
                    follower_profile_url: follower_profile_url,
                    screen_name: req.body.name,
                });
            }
        });
    
    });
});

app.get("/", function(req, res) {
    res.render('index.ejs');
});

app.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
