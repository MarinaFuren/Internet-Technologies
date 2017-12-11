var gambling = {ones:0,zeros:0};
var hujiwebserver = require('./hujiwebserver');
var port = 8081;
var fs = require("fs");

var server = hujiwebserver.start(port, function (err) {

    if (err) {
        console.log("could not start server");
        return;
    }
});

hujiwebserver.use('/www/', function(req, res, next) {
    var data;
    if (req.path.search(new RegExp("[A-Za-z_-]+\.(html|js|css)")) >= 0) {

        fs.readFile("." + req.path, 'utf8', function (err, body) {
            data = body;
            if (err) {
                console.log("Bad file: " + req.path);
                res.status(404).send("<h1>404 error: File not found</h1>");
                return;
            }
            var suffix = req.path.split(".");
            if (suffix[1] === 'html'){
                res.set('content-type', 'text/html');
                res.status(200);
                res.send(data);
            }
            else if (suffix[1] === 'css'){
                res.set('content-type', 'text/css');
                res.status(200);
                res.send(data);
            }
            else if (suffix[1] === 'js'){
                res.set('content-type', 'application/javascript');
                res.status(200);
                res.send(data);
            }
            else {
                res.status(404);
                res.printError();
            }
        });
    }

});
hujiwebserver.use('/gamble/:val', function(req, res, next){
    var val = req.param('val');
    if (val === '1'){
        gambling.ones += 1;
        res.status(200);
        res.send(JSON.stringify(gambling));
    }
    else if (val === '0') {
        gambling.zeros += 1;
        res.status(200);
        res.send(JSON.stringify(gambling));
    }
    else if (val === 'reset') {
        gambling.ones = 0;
        gambling.zeros = 0;
        res.status(200);
        res.send(JSON.stringify(gambling));
    }
    else {
        res.status(404);
        res.printError();
    }
});
