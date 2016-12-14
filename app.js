var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

// Basic page serving
app.use(express.static('./public/', {
    extensions: ['html', 'htm']
}));

app.listen(3000, function () {
  console.log('Running on port 3000');
});
