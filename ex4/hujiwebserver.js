var commands = [];
var parser = require("./hujirequestparser");
var fsModule = require('fs');

function use(c, mw) {
    if (arguments.length === 1) {
        mw = arguments[0];
        c = '/';
    }
    commands.push({command: c, middleware: mw});
    return this;
}

function start(p, c) {
    var net = require("net");
    this.server = net.createServer(hujiRun);
    this.server.listen(p,c);

    return this;
}

function hujiRun(socket) {
    var creator = require("./requestresponsecreator");
    var totalData = "";
    socket.setTimeout(10000);

    socket.on('disconnect', function () {
        console.log('could not connect');
    });

    socket.on('error', function () {
        socket.destroy();
    });

    socket.on('timeout', function () {
        var currResponse = new creator.response();
        currResponse.socket = socket;
        currResponse.statuscode = "404";
        currResponse.printError();
        socket.destroy();
    });

    socket.on('data', function (data) {
        var currResponse = new creator.response();
        totalData += data.toString();
        if (totalData.indexOf("\r\n\r\n") > -1 || totalData.indexOf("\n\n") > -1) {
            try {
                currResponse.socket = socket;
                var requestVar = new parser.parser(totalData.toString());
                currResponse.protocol = requestVar.protocol.toLowerCase();
                currResponse.version = requestVar.version;
                currResponse.checkResponseCode(requestVar);
                handleRequest(requestVar, currResponse);
                totalData = totalData.split("\r\n\r\n").join("\n\n");
                var updateData = totalData.split("\n\n");
                if (updateData.length > 1) {
                    totalData = updateData[1];
                } else {
                    totalData = "";
                }
            } catch (e) {
                currResponse.statuscode = e.message;
                currResponse.printError();
            }
        }
    });
}

function handleRequest(request, response) {
    var findPage = false;
    for (i = 0; i < commands.length; i++) {
        if (findTheRightURL(commands[i].command, request.path)) {
            findPage = true;
            parser.createParams(commands[i].command, request);
            this.nextFlag = false;
            commands[i].middleware(request, response, next);
            if (this.nextFlag === false) {
                break;
            }
        }
    }
    if (!findPage) {
        throw Error("404");
    }
}
function findTheRightURL(currUrl, urlToFind) {
    var commandReg = new RegExp('^' + currUrl.replace(/:\w*/g, '.+') + '\\b');
    return commandReg.test(urlToFind);

}

function stop() {
    this.server.close();
}

function next() {
    this.nextFlag = true;
}

module.exports = {use: use, start: start, stop: stop};
