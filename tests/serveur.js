var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if ('sequence1' in params && 'sequence2' in params) {
        res.write('Vous vous appelez ' + params['sequence1'] + ' ' + params['sequence2']);
    }
    else {
        res.write('il y a forcement des séquence ');
    }
    res.end();
});
server.listen(8080);