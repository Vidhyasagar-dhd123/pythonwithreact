const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry : './src/index.js',
    output: {
        path: path.resolve(__dirname, './static/frontend'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets :['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // If you're importing CSS
      },
        ]
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify('production')
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
}