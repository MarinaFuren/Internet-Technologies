
exports.request = function () {
    return {
        params : {},
        query : {},
        method : "",
        cookies : {},
        path : "",
        host : '',
        protocol : {},
        headers : {},
        version : '',
        url : '',
        body : "",
        param: function (name) {
            return this.params[name];
        },
        get: function(field) {
            field = field.toLowerCase();
            if (field in this){
                return this[field];
            }
            else {
                return undefined;
            }
        },
        is: function(type) {
            var fieldName = 'content-type';
            if (typeof type === 'string') {
                type = type.replace('/*', '');
                return (this[fieldName].indexOf(type) >= 0);
            } else {
                return (this[fieldName].indexOf(type[0]) >= 0);
            }
        }
    };
};


exports.response = function () {
    return {
        statuscode : 200,
        fields : {"content-type": "", "content-length": 0},
        cookiesrt: {},
        socket: undefined,
        version: "",
        errorExp : {"404": "Not Found", "500": "Internal Error", "200": "OK", "501": "Not Implemented"},
        protocol: "",

        set: function (field, value) {
            if (typeof  field === 'string') {
                this.fields[field.toLowerCase()] = value;
            } else {
                for (var i in field){
                    this.fields[i] = field[i];
                }
            }
        },
        status: function (code) {
            this.statuscode = code;
            return this;
        },
        get: function (field) {
            return this.fields[field];
        },
        cookie: function (name, value, options) {
            var pathExs = false;
            this.cookiesrt = name + '=' + value + '; ';
            for (var i in options) {
                this.cookiesrt += Object.keys(options)[i] + '=' + options[Object.keys(options)[i]] + '; ';
                if ('path'.localeCompare(Object.keys(options)[i])) {
                    pathExs = true;
                }
            }
            if (pathExs === false) {
                this.cookiesrt += 'Path=/;'
            }
        },
        send: function (body) {
            if (body === undefined) {
                body = "";
            }
            var bodystr = "";
            if (this.fields['content-type'] === "") {
                this.set('content-type', 'text/html');
            }

            if (typeof body === 'string'){
                bodystr = body;
                this.set('content-length', bodystr.length);
            } else {
                body = JSON.stringify(body);
                this.set('content-type', 'application/json');
                bodystr = body;
                this.set('content-length', bodystr.length);
            }
            this.socket.setTimeout(25000);
            this.createResponseHeaders();
            this.socket.write(bodystr);
            this.socket.end();
        },
        json: function (body) {
            if (body) {
                this.send(JSON.stringify(body));
            }
            else if (body === null) {
                this.send("null");
            } else {
                this.send("undefined");
            }

        },
        createResponseHeaders: function () {
            this.socket.write('HTTP\/' + this.version + ' ' + this.statuscode + ' ' + this.errorExp[this.statuscode] + '\n');
            this.socket.write('content-type: ' + this.fields['content-type'] + '\n');
            this.socket.write('content-length: ' + this.fields['content-length'] + '\n\n');

        },
        checkResponseCode: function(request){
            try {
                this.checkVersion(request.version);
                this.checkRequestMethods(request.method);
            }
            catch (e){
                this.statuscode = 500;
                this.version = "1.1";
                this.printError();
            }


        },

        printError: function () {
            this.set('content-type', 'text/html');
            bodyError = "<html>";
            bodyError += '<title>' + this.statuscode + ' ' + this.errorExp[this.statuscode] + '</title>';
            bodyError += "<body>" + this.statuscode + ' ' + this.errorExp[this.statuscode] + "</body>";
            bodyError += "</html>";
            this.fields['content-length'] = bodyError.length;
            this.createResponseHeaders();
            this.socket.write(bodyError);
            this.socket.end();

        },

        checkRequestMethods: function(method) {
            if (method != "GET" && method != "POST" && method != "PUT" && method != "DELETE"
                && method != "OPTIONS" && method != "TRACE"){
                throw new Error(500);
            }
        },

        checkVersion: function (currVersion) {
            if (currVersion != "1.0" && currVersion != "1.1"){
                throw new Error(500);
            }


        }
    };
};