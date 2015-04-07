var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.listen(port, function(error){
  if(error) throw error;
  console.log('server now listening on port ' + port + '...');
});
