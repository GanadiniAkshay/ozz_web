import express from 'express';
import path from 'path';


import routes from '../client/routes';

let app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*',(req,res) => {
    res.render('index');
});


//start the server
const port = process.env.PORT || 8080;
const env  = process.env.NODE_ENV || 'production';

app.listen(port, () => console.log('Running on localhost:' + port));