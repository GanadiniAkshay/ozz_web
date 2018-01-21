var fs = require('fs');
var prompt = require('prompt');
var config = JSON.parse(fs.readFileSync('./releases/release.json', 'utf8'));

// 
// Start the prompt 
// 
prompt.start();


// Ask user for new version
console.log("Current version is " + config.version);


// 
// Get new version 
// 
prompt.get(['version'], function (err, result) {
    // 
    // Log the results. 
    // 
    config.version = result.version;
    console.log('  version: ' + result.version);
});