const path = require('path');
const webpack =require('webpack');

new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
});

module.exports = {
    entry: './js/Script.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js'
    },
    mode: 'production',
    watch: true,
    devtool:"source-map",

    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [['@babel/preset-env', {
                    debug: true,
                    corejs:3,
                    useBuiltIns:"usage"
                }]]
              }
            }
          }
        ]
    }
};