// Load the http module to create an http server.
var express = require('express');
var app = express();
var path = require('path');
var Twit = require('twit');
var async = require('async');
var twitter = require('twitter');
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
app.use(express.static(__dirname + '/public'));

// routing for the homepage
app.get("/", function(req, res) {

    setTimeout(function() {

    }, 1000); 

    T.get('followers/ids', { screen_name: 'srish_aka_tux', count: 30},  function (err, data, response) {
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

                res.render('index.ejs', {
                    follower_data: follower_data,
                    follower_profile_url: follower_profile_url
                });
            }
        });
    
    });

});

app.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
