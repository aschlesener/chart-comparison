const http = require('http');
var fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;
var d3 = true;

const server = http.createServer((req, res) => {
    if (req.url.includes('/data/')) {
        var fileName = req.url.slice(req.url.indexOf('data/'), req.url.length);
        fs.readFile(fileName, function(err, data){
            if (d3) {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(data);
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'application/octet-stream'});
                res.write(data);
                res.end();
            }
          });
    } else if (req.url.includes('highcharts')) {
        d3 = false;
        fs.readFile("index_highcharts.html", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else {
        d3 = true;
        fs.readFile("index.html", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});