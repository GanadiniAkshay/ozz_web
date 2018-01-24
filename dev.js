var fs = require('fs');
var cmd = require('node-cmd');

var start_server = function(){
    console.log("starting server");
}

//
// Reset config
//
var client_config = JSON.parse(fs.readFileSync('./client/backend.json', 'utf8'));
client_config.url = 'http://localhost:5000/api';
var json = JSON.stringify(client_config);
fs.writeFile('./client/backend.json', json, 'utf-8', start_server);