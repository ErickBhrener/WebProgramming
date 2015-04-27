var express = require("express"),
    redis = require("redis"),
    bodyParser = require("body-parser"),
    crypto = require("crypto");
var request = require("request");
var path = require("path");

var client = redis.createClient(), //CREATE REDIS CLIENT
    app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "public")));

var regisSave = function(key, value) {
    client.set(key, value, function(error, result) {
        if (error !== null) {
            console.log("error: " + error);
        } else {
            console.log("saved");
        }
    });
};

app.get("/", function(req, res) {
    res.render("index");
});
app.get("/:uid", function(req, res) {
    client.get(req.params.uid, function(error, url) {
        if (error !== null) {
            console.log("error: " + error);
        } else {
            if (url !== null) {
                client.zincrby("urls", 1, req.params.uid, function(err, result) {
                    if (result === true) {
                        console.log(url + "increased by one");
                    }
                });
                res.redirect(url);
            } else {
                res.render("index");
            }
        }
    });
});

app.post("/save", function(req, res) {
    var url = req.body.key;
    var uid = new Date().getTime().toString();
    uid = crypto.createHmac("sha512", uid).update(url).digest("base64");
    uid = uid.slice(0, 8).replace(/\//g, '').replace(/\+/g, '');
    client.exists(url, function(err, reply) {
        if (reply === 1) {
            console.log("exists");
            client.get(url, function(error, val) {
                if (error !== null) {
                    console.log("error: " + error);
                } else {
                    res.send("<p>This URL already exists. Its shortned URL is: </p><br />" + "<a href='http://localhost:3000/" + val + "'>" + "http://localhost:3000/" + val + "</a>");
                }
            });
        } else {
            client.set(uid, url, function(error, result) {
                if (error !== null) {
                    console.log("error: " + error);
                } else {
                    client.zadd("urls", 0, uid);
                    regisSave(url, uid); //saving in the other way.
                    res.send("<p>New url: " + uid + "<p><br /><a href='http://localhost:3000/" + uid + "'>" + "http://localhost:3000/" + uid + "</a>");
                }
            });
        }
    });

});

app.post("/urls", function(req, res) {
    client.zrevrange("urls", 0, 10, function(err, replies) {
        res.json(JSON.stringify(replies, null, 4));
    });
});

var server = app.listen(3000, function() {
    console.log("BASIC REDIS server is listening on port %d", server.address().port);
});