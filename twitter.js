// Load the http module to create an http server.
var express = require('express');
var app = express();

var path = require('path');

//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.listen(8000);
console.log('Listening on port 8000');

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");