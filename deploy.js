var fs = require('fs');
var prompt = require('prompt');
var cmd = require('node-cmd');
var config = JSON.parse(fs.readFileSync('./releases/release.json', 'utf8'));

var get_new_version = function(){
    // 
    // Start the prompt 
    // 
    prompt.start();


    // Ask user for new version
    console.log("Current version is " + config.version);

    // Delete the old version files
    var del_string = 'rm -rf ./releases/v' + config.version;
    cmd.run(del_string);


    // 
    // Get new version 
    // 
    console.log("Enter New Version")
    prompt.get(['version'], function (err, result) {
        // 
        // Log the results. 
        // 
        console.log('Deleting previous version');
        var json = JSON.stringify(result);
        fs.writeFile('./releases/release.json', json, 'utf-8', start_deploying);
    });

    // Start the deploy process
    var start_deploying = function(){
        var config = JSON.parse(fs.readFileSync('./releases/release.json', 'utf8'));
        console.log("Starting Build...")
        console.log(config);

        var client_config = JSON.parse(fs.readFileSync('./client/backend.json', 'utf8'));
        console.log(client_config);
        //Build the Distribution
        cmd.get(
            'npm run build',
            function(err, data, stderr){
                console.log("Build completed");
                console.log("Creating deployment folder for v" + config.version);
                cmd.get(
                    'mkdir releases/v' + config.version,
                    function(err, data, stderr){
                        console.log("Deployment folder created");
                        console.log("Moving build to deployment folder")
                        cmd.get(
                            'cp -r ./server/dist/ ./releases/v' + config.version,
                            function(err, data, stderr){
                                console.log("Pushing deployment folder to CDN");
                                cmd.get(
                                    'directory-to-s3 -d releases/v'+config.version +' ozz-cdn/v'+config.version,
                                    function(err, data, stderr){
                                        console.log("Deployed v" + config.version);
                                    }
                                )
                            }
                        )
                    }
                )
            }
        )
    } 
}


//
// Reset config
//
var client_config = JSON.parse(fs.readFileSync('./client/backend.json', 'utf8'));
client_config.url = '/api';
var json = JSON.stringify(client_config);
fs.writeFile('./client/backend.json', json, 'utf-8', get_new_version);