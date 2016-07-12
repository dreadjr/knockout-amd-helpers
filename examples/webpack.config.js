"use strict"

// webpack --display-modules -c -v --config=webpack.config.js --display-error-details

let path = require('path');
let webpack = require('webpack');
//let ExtractTextPlugin = require("extract-text-webpack-plugin");
// var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  debug: true,
  entry: {
    app: './main-webpack.js',

    // pages or sections, etc

    vendor: ['knockout', 'knockout-amd-helpers'] //
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack.optimized.js',
    publicPath: './dist/'
  },

  resolve: {
    root: [
    ],
    alias: {
      "knockout": path.resolve(__dirname, "./../ext/knockout-3.1.0"),
      "knockout-amd-helpers": path.resolve(__dirname, "./../build/knockout-amd-helpers")
    },
    modulesDirectories: [
      "node_modules"
    ]
  },

//  resolveLoader: {
  // Where to resolve our loaders
//    modulesDirectories: ['node_modules'],
//    alias: {
//      'text': 'loader definition goes here',
//    }
//  },

  module: {
    // https://github.com/civicsource/knockout-template-loader
    loaders: [
//      , {
//        // ASSET LOADER
//        test: /\.(woff|woff2|ttf|eot)$/,
//        loader: 'file'
//      },
//      {
//        //IMAGE LOADER
//        test: /\.(jpe?g|png|gif|svg)$/i,
//        loader:'file'
//      },
//      {
//        test: /\.(jpe?g|png|gif)$/i,
//        loaders: [
//          'file-loader?name=[name]-[hash:6].[ext]',
//          'placeholdit-loader?bypassOnDebug=false'
//        ]
//      },
//      {
//        test: /\.css$/,
//        loader: "css-loader!autoprefixer-loader"
//      }
//      {
//        test: /\.scss$/,
//        loader: "css-loader!sass-loader"
//      }
//      {
//        test: /\.js$/,
//        loader: 'babel',
//        include: [
//          path.resolve(__dirname, "modules"),
//        ],
//        exclude: /node_modules/
//      },

      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.tmpl\.html$/,
        loader: "text",

//        loader: "knockout-template!html?name=[name]",
//        loader: "knockout-template!html",
        include: [
          path.resolve(__dirname, "templates"),
        ]
      },
    ],
//    noParse: [
//      /knockout\/build\/output\/knockout-latest\.debug\.js/
//    ]
  },
  plugins: [
    // TODO: externalize knockout, pull from cdn

//    new webpack.ProvidePlugin({
//      ko: "knockout",
//    }),

    // https://robertknight.github.io/posts/webpack-dll-plugins/
//    new webpack.optimize.CommonsChunkPlugin({
//      name: "vendor",
//      filename: "vendor.bundle.js",
//      minChunks: Infinity,
//    })



      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
//    new webpack.optimize.CommonsChunkPlugin({
//      names: ["common", "vendor"],
//      minChunks: 2
//    }),

    new webpack.ContextReplacementPlugin(/^\.\/knockout-modules/, path.resolve("modules")),
    new webpack.ContextReplacementPlugin(/^\.\/knockout-templates/, path.resolve("templates")),
  ],

  devServer: {
    host: 'localhost',
    port: 7777,
    proxy: {
    },
     publicPath: './dist/',
    stats: {
      colors: true,
    },
  }
}
