var http = require('http');
var url = require('url');
var port = 1337;

var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.end('<p>Welcome Home !</p>');
});

app.get('/chucknorris', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.end('<p>You will die.</p>');
});

app.get('/who-is-the-best/:name', function(req, res){
    res.render('whoisthebest.ejs', { name : req.params.name});
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Not found... sorry!!!!');
});

app.listen(port);