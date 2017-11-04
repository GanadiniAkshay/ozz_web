var cmd = require('node-cmd');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./releases/release.json', 'utf8'));

console.log("Starting Build...")
console.log(config);
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