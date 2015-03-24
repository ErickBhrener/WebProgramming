var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');
var response = require('response');
var bodyParser = require('body-parser');
var app = express();
var history = {"outcome":"","wins":0,"losses":0,"ties":0};
var Game = require('./game.js');
app.set('port', process.env.PORT || 3000);
app.set('public', __dirname + '/public');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/public',  express.static(__dirname + '/public'));


app.get("/", function (req, res) {
	console.log("call get");
    res.sendFile('public/index.html', {root: __dirname });
});
var game = new Game();

app.post('/play/rock',function(req, res){
	
	console.log(game.getMove('rock',history));
  	res.json(history);
});
app.post('/play/paper',function(req, res){
	
	console.log(game.getMove('paper',history));
  	res.json(history);
});
app.post('/play/lizard',function(req, res){
	
	console.log(game.getMove('lizard',history));
  	res.json(history);
});
app.post('/play/spock',function(req, res){
	
	console.log(game.getMove('spock',history));
  	res.json(history);
});
app.post('/play/scissors',function(req, res){
	console.log(game.getMove('scissors',history));
  	res.json(history);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
