const express = require('express');
const http = require('http');
const app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.favicon());
  app.use(express.cookieParser('cookie secret'));
  app.use(express.session());
  app.use(express.csrf());
  app.use(function(req, res, next) {
    res.locals._csrf = req.session._csrf; // sessionからresponse変数
    next();
  });
  app.use(app.router);
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.configure('production', function() {
  app.use(function(err, req, res, next) {
    res.send(err);
  });
});

app.get('/', function(req, res) {
  console.log(req.session._csrf);
  res.render('index');
});

app.post('/', function(req, res) {
  res.send(req.body.text);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
