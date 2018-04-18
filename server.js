var express= require('express');
var path = require('path');

var app = express();

var appinsights = require('applicationinsights');
appinsights.setup('1d424a55-c0b7-45b0-81f6-bf45c69cf17e').start();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/server/views'));

// define the folder that will be used for static assets
app.use(express.static(path.join(__dirname, '/server/dist')));

app.get('/*',(req,res) => {
    res.render('index');
});


//start the server
const port = process.env.PORT || 8080;
const env  = process.env.NODE_ENV || 'production';

app.listen(port, () => console.log('Running on localhost:' + port));