var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

var urls = [];
var port = process.env.port || 3000;

// create application/json parser
var jsonParser = bodyParser.json();
var paths = {
  src: path.join(__dirname, 'src')
};

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.static('public'));
app.use(jsonParser);

app.route('/urls')
  .put(function (req, res) {
    if (!req.body || !req.body.url ) return res.sendStatus(400);
    var url = req.body.url;
    if(urls.indexOf(url) !== -1) return res.sendStatus(409);
    urls.push(url);

    while(urls.length > 5) urls.shift();
    res.sendStatus(200);
  })
  .get(function (req, res) {
    res.status(200);
    res.json({
      urls: urls
    });
  });

app.get('/', function(req, res) {
  res.sendFile('index.html', { root: paths.src });
});

app.get('/test', function(req, res) {
  res.sendFile('test.html', { root: paths.src });
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});