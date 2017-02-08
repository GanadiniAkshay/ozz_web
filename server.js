var express= require('express');
var path = require('path');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/server/views'));

// define the folder that will be used for static assets
app.use(express.static(path.join(__dirname, '/server/dist')));

app.get('/*',(req,res) => {
    res.render('index');
});


//start the server
const port = process.env.PORT || 5000;
const env  = process.env.NODE_ENV || 'production';

app.listen(port, () => console.log('Running on localhost:5000'));