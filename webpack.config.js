var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./assets/javascripts/entry.js",
  output: {
    path: path.join(__dirname, "src"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".js.jsx"]
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, "app/assets/javascripts"),
        exclude: /(node_modules)/,
        loader: "babel",
        query: {
          optional: ['es7.classProperties', 'es7.objectRestSpread']
        }
      },
      {
        test: /\.woff$/,
        loader: require.resolve('file-loader'),
        query: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: require.resolve("react/addons"),
        loader: "expose?React"
      }
    ]
  },
  eslint: {
    emitWarning: true,
    emitError: true,
    failOnWarning: true,
    failOnError: true
  },
  plugins: [
      new ExtractTextPlugin("style.css", { allChunks: true })
  ],
  stats: {
    children: false
  }
};
