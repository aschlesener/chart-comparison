const http = require('http');
var fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url.includes('/data/')) {
        var fileName = req.url.slice(req.url.indexOf('data/'), req.url.length);
        var file = fs.createReadStream(fileName);
        file.pipe(res);
    } else if (req.url.includes('highcharts_bigdata')) {
        d3 = false;
        fs.readFile("highcharts_bigdata.html", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if (req.url.includes('highcharts')) {
        fs.readFile("highcharts.html", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if (req.url.includes('d3_bigdata')) {
        fs.readFile("d3_bigdata.html", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }  else if (req.url.includes('d3')) {
        fs.readFile("d3.html", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else {
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