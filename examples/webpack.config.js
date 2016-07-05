"use strict"

let path = require('path');
let webpack = require('webpack');
//let ExtractTextPlugin = require("extract-text-webpack-plugin");
// var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  debug: true,
  entry: {
//    context: __dirname,
//    context: path.resolve(__dirname),
    app: './main-webpack.js',

    // pages or sections, etc

    vendor: ['knockout', 'knockout-amd-helpers'] //
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack.optimized.js',
    publicPath: 'dist/'
  },

  resolve: {
    root: [
//      path.resolve('.'),
//      path.resolve(__dirname, "modules"),
//      path.resolve(__dirname, "templates")
//      ,path.resolve("./modules")
      //,path.resolve(__dirname, "templates")
    ],
    alias: {
//            "knockout": "../ext/knockout-3.1.0",
//      "knockout-amd-helpers": "../build/knockout-amd-helpers"
//      "modules": path.resolve("/modules"),
//      "templates": path.resolve("/templates"),
      "knockout": path.resolve(__dirname, "./../ext/knockout-3.1.0"),
      "knockout-amd-helpers": path.resolve(__dirname, "./../build/knockout-amd-helpers")
    },
    modulesDirectories: [
      "node_modules",
      "modules"
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
      , {
        // ASSET LOADER
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file'
      },
      {
        //IMAGE LOADER
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader:'file'
      },
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
        test: /\.tmpl\.html$/,
//        test: /\/templates\/\.tmpl\.html$/,
        // amd-helpers
        loader: "text",

        // don't use
//        loader: "knockout-template!html?name=[name]",
//        loader: "knockout-template!html",
        include: [
          path.resolve(__dirname, "templates"),
        ]
      },

//      {
//        test: /\.tmpl\.html$/,
////        test: /\/templates\/\.tmpl\.html$/,
//        // amd-helpers
//        loader: "html-loader",
//
//        // don't use
////        loader: "knockout-template!html?name=[name]",
////        loader: "knockout-template!html",
//        include: [
//          path.resolve(__dirname, "templates"),
//        ]
//      },


      //{test: /knockout\/build\/output\/knockout-latest\.debug\.js/, loader: 'imports?require=>__webpack_require__'}
    ],
//    noParse: [
//      /knockout\/build\/output\/knockout-latest\.debug\.js/
//    ]
  },
  plugins: [
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

//    new webpack.ContextReplacementPlugin(/^\.\/ko/, path.resolve(__dirname, "modules"))
    new webpack.ContextReplacementPlugin(/^\.\/ko/, path.resolve("modules")),
//    new webpack.ContextReplacementPlugin(/^\.\/templates/, path.resolve("templates")),
    new webpack.ContextReplacementPlugin(/^\.\/knockout-amd-helpers/, path.resolve("templates")),
//    new webpack.ContextReplacementPlugin(/text!\.\/templates$/, path.resolve("templates"))



    //    new webpack.ContextReplacementPlugin(/\modules/),
//    new webpack.ContextReplacementPlugin(/\templates/),
  ],



  devServer: {
    host: 'localhost',
    port: 7777,
    proxy: {
    },
    // publicPath: './dist/',
    stats: {
      colors: true,
    },
  }
}


//'use strict'
//
//const path = require('path')
//const webpack = require('webpack')

//const providePlugin = new webpack.ProvidePlugin({
////  'jQuery': 'jquery',
////  '$': 'jquery',
////  'window.jQuery': 'jquery'
//
//})

//module.exports = {
//  'context': path.join(__dirname, '.'),
//  'resolve': {
//    'root': [
//      path.join(__dirname, '.')
//    ],
//    'alias': {
//      'jquery': 'lib/jquery/jquery',
//      'moment': 'lib/moment',
//      'underscore': 'lib/wrapper/underscore',
//      'backbone': 'lib/wrapper/backbone'
//    }
//  },
//  'entry': {
//    'module-one': './module-one',
//    'module-two': './module-two'
//  },
//  'output': {
//    'path': path.join(__dirname, '../build/js'),
//    'filename': '[name].js'
//  },
//  'plugins': [
//    providePlugin
//  ],
//  'modules': {
//    'loaders': [
//      {
//        'test': /underscore/,
//        'loader': 'exports?_'
//      },
//      {
//        'test': /backbone/,
//        'loader': 'exports?Backbone!imports?jquery,underscore'
//      }
//    ]
//  }
//}
