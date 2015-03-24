/////////////////////////////
////    server side     ////
///////////////////////////

// var routes = require('./routes');
// var user = require('./routes/user');

// dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');
var response = require('response');
var bodyParser = require('body-parser');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {res.render('index')});
app.post('/p',function(req, res){
	console.log(req.body.title);
	var val = req.body.title;
	craig = "No result.";
	var url2 = "http://api.themoviedb.org/3/search/movie?api_key=ae22cfb91b3d2c0a8179d99a29831489&query="+val;
	request.get(url2, function (err, resp, body) {
    	if (!err) {
	        var resultsObj = JSON.parse(body);
	        console.log(resultsObj.results[0].poster_path);
	        var tlt = resultsObj.results[0].original_title;
	        var date = resultsObj.results[0].release_date;
	        var votes = resultsObj.results[0].vote_average;
	        // craig = '<ul>'
	        // +'<li>Title: '+tlt+'</li>'
	        // +'<li>Release: '+date+'</li>'
	        // +'<li>Votes Average: '+votes+'</li>'
	        // +'</ul>';
	        craig = '<img src=http://image.tmdb.org/t/p/w500/'+resultsObj.results[0].poster_path+'/>';
    	}
    	res.set('Content-Type', 'text/html');
    	res.send(craig);
    });
    

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
