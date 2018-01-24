import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import config from '../config';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import events from './routes/events';

// var options = { 
//   server: { 
//     socketOptions: { 
//       keepAlive: 300000, connectTimeoutMS: 30000 
//     } 
//   }, 
//   replset: { 
//     socketOptions: { 
//       keepAlive: 300000, 
//       connectTimeoutMS : 30000 
//     } 
//   } 
// };

// mongoose.Promise = global.Promise;

// mongoose.connect(config.database, options);

let app = express();

app.use(bodyParser.json());
app.use('/api/events',events);

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

// define the folder that will be used for static assets
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});


//start the server
const port = process.env.PORT || 3000;
const env  = process.env.NODE_ENV || 'production';

app.listen(port, () => console.log('Running on localhost:3000'));