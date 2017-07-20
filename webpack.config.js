var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js'
    }
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
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  },

  node: {
    fs: 'empty'
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/templates/index.hbs'
    })
  ]
}