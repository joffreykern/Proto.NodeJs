//var http = require('http');
var port = process.env.port || 1337;

var express = require('express');
var app = express();

app.use(express.cookieParser())
    .use(express.session({secret: 'todotopsecret'}))
    .use(express.bodyParser())
    .use(function(req, res, next){
        if (typeof(req.session.todolist) == 'undefined') {
            req.session.todolist = [];
        }
        next();
    });

app.get('/', function(req, res){
    //res.setHeader('Content-Type', 'text/html');
    //res.send('ok');
    res.render('home.ejs', { todoes : req.session.todolist});
});

app.post('/todo', function(req, res){
    req.session.todolist.push(req.body.newtodo);
    res.redirect('/');
});

app.listen(port);