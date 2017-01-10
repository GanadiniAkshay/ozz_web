import express from 'express';

let app = express();

app.get('/*',(req,res) => {
    res.send('hello world');
});


//start the server
const port = process.env.PORT || 3000;
const env  = process.env.NODE_ENV || 'production';

app.listen(port, () => console.log('Running on localhost:3000'));