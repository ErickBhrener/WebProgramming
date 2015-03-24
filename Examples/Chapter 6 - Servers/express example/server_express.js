var express = require('express');
var fs = require('fs');
var app = express();

//app.use(express.logger());     // displays info for each HTTP request
//app.use(express.urlencoded()); // creates req.body for POST requests
//app.use(app.router);
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/forum-base.html');
});
app.get('/fetch', function (req, res) {
    console.log('sending posts');
    res.sendfile(__dirname + '/posts.html');
});
app.post('/addnew', function (req, res) {
    console.log('posting message');
    var name = req.body.name || 'Unknown';
    var message = req.body.message || '(none)';

    // SECURITY HOLE: confirm name and message are reasonably short
    // SECURITY HOLE: escape quotes and special chars
    var fileOut = fs.createWriteStream(__dirname + '/posts.html',
        { flags: 'a' });
    fileOut.write('<div><b>User:</b> ' + name
        + '<br />' + message + '</div>\n');
    fileOut.end();

    res.sendfile(__dirname + '/forum-base.html');
});

app.listen(8888);
