var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ]
  },

  entry: {
    'scripts': './src/index.js'
  },

  devServer: {
    inline: true
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      },
      {
        test: /\.hbs$/,
        use: 'handlebars-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.hbs'
    })
  ]
}