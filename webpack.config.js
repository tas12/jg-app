const Path = require('path')

module.exports = {
  entry: Path.join(__dirname, 'App', 'script.js'),

  output: {
    path: Path.join(__dirname, 'App'),
    filename: 'bundle.js',
  },

  devServer: {
    inline: true,
    port: 8080
  },
  
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',

        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
