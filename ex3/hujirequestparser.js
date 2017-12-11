var url = require('url');
var creator = require('./requestresponsecreator');


exports.parser = function (string) {
    var request = new creator.request();
    string = string.split("\r\n").join("\n");
    var lines = string.split("\n");
    var firstLine = lines[0];
    lines.shift();
    var firstLineArr = firstLine.split(" ");
    request.method = firstLineArr[0];
    request.url = firstLineArr[1];
    var fullPath = firstLineArr[1].split("?");
    request.path = fullPath[0];
    var firstLineArr2 = firstLineArr[2].split("/");
    request.protocol = firstLineArr2[0].toLowerCase();
    request.version = firstLineArr2[1];

    request.query = url.parse(request.url.toString(), true).query;

    if (request.method.localeCompare("POST") === 0){
        request.body = lines[lines.length-1];
        lines.pop();

    }

    for (var i = 0; i < lines.length; i++) {
        var currLine = lines[i];
        var currLineArr = currLine.split(": ");
        if (currLineArr[0].localeCompare("Host") === 0) {
            request.host = currLineArr[1].split(":")[0];
        }
        else if(currLineArr[0].localeCompare("Cookie") === 0){
            var currCookieLine = currLineArr[1];
            currCookieLine = currCookieLine.split(" ").join("");
            var cookieParam = currCookieLine.split(";");
            for (i in cookieParam){
                var currObj = cookieParam[i].split("=");
                request.cookies[currObj[0]] = currObj[1];
            }
        }
        else {
            request[currLineArr[0].toLowerCase()] = currLineArr[1];
        }
    }
    return request;

};

function createParams(command, request) {
    var commandRoot = /^(.*?)(\/:|\/=|\?)/g;
    var matchRoot = commandRoot.exec(command);
    if (matchRoot === null) {
        return;
    }
    if (request.path.indexOf(matchRoot[1]) > -1) {
        var rootLength = matchRoot[1].length;
        var shortComm = command.substring(rootLength);
        var shortReq = request.url.substring(rootLength);
        var keyReg = /\/:([a-zA-z0-9]+)/g;
        var valReg = /\/([a-zA-z0-9]+)/g;
        var matchReq = valReg.exec(shortReq);
        var matchComm = keyReg.exec(shortComm);
            while (matchComm != null || matchReq != null) {
                request.params[matchComm[1]] = matchReq[1];
                matchReq = valReg.exec(shortReq);
                matchComm = keyReg.exec(shortComm);
            }
        }
}
module.exports.createParams = createParams;
