var fsModule = require('fs');
var Pathzzz = require('path');
var hujiwebserver = require('./hujiwebserver');
var port = 8080;


var server = hujiwebserver.start(port, function (err) {

    if (err) {
        console.log("could not start server");
        return;
    }
});

console.log("server start successfully");

server.use("/hello/world", function (req, res, next) {
    res.set("content-type", "text/plain");
    res.send("hello world");

});

server.use("/add/:n/:m", function (req, res, next) {
    res.set("content-type", "application/json");
    var ans = 1 * req.params["n"] + 1 * req.params["m"];
    res.json({result: ans});


});

server.use("/filez/*", function (req, res, next) {
    var fullpath = Pathzzz.join(__dirname, req.path);

    if (req.path.endsWith(".html")) {
        res.set("content-type", "text/html");
    }
    else if (req.path.endsWith(".js")) {
        res.set("content-type", "application/javascript");
    }
    else if (req.path.endsWith(".css")) {
        res.set("content-type", "text/css");
    } else {
        res.statuscode = 500;
        res.send("BAD FILE FORMAT");
        return;
    }

    var body = fsModule.readFile(fullpath, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.statuscode = 404;
            res.send("PAGE NOT FOUND");
        }
        else {
            res.send(data.toString())
        }

    })
});


