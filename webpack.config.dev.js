import path from 'path';
import webpack from 'webpack';

export default {
    devtools: 'eval-source-map',
    entry : [
        'webpack-hot-middleware/client',
        path.join(__dirname, '/client/index.js')
    ],
    node:{
        'fs':'empty'
    },
    output: {
        path: '/',
        publicPath: '/'
    },
    devtool: '#eval-source-map',
    plugins : [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders:[
            {
                test: /\.js$/,
                include: [
                        path.join(__dirname, 'client'),
                        path.join(__dirname,'server/shared')
                    ],
                loaders: [ 'react-hot', 'babel']
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            },
            {
                test: /\.css$/,  
                include: /node_modules/,  
                loaders: ['style-loader', 'css-loader']
           }
        ]
    },
    resolve: {
        extentions: ['', '.js']
    },
    node: {
        net : 'empty',
        dns : 'empty'
    }
}