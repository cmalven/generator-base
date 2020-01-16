const config = require('../config');
const gulp = require('gulp');
const _ = require('lodash');
const path = require('path');
const stripAnsi = require('strip-ansi');
const webpack = require('webpack');
const util = require('util');
const UglifyJsPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require('core-js/stable');

//
//   Scripts : Bundle
//
//////////////////////////////////////////////////////////////////////

/*
Bundles javascript files.
*/

gulp.task('scripts:bundle', function(done) {
  const DEV = 'development';
  const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : DEV;

  //---------------------------------------------------------------
  // Plugins
  //---------------------------------------------------------------
  let plugins = [
    // Give all modules access to jQuery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ];

  // Bundle analyzer in development
  if (ENV === DEV) {
    plugins = plugins.concat([
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      })
    ]);
  }


  //---------------------------------------------------------------
  // Config
  //---------------------------------------------------------------

  const webpackConfig = {
    mode: ENV,

    entry: _.reduce(config.scripts.entryFiles, function(result, name) {
      result[name] = path.resolve('./' + config.paths.scriptSrc + name);
      return result;
    }, {}),

    output: {
      path: path.resolve('./' + config.paths.scriptDist),
      filename: '[name].bundle.js',
      publicPath: config.paths.scriptPublic,
      chunkFilename: '[name].bundle.js'
    },

    resolve: {
      modules: [
        path.resolve('./node_modules'),
        path.resolve('./' + config.paths.scriptSrc + 'vendor')
      ],
      alias: config.scripts.aliases
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader', 'eslint-loader'],
          exclude: [/node_modules/]
        }
      ]
    },

    optimization: {
      minimizer: [
        new UglifyJsPlugin()
      ]
    },

    plugins: plugins
  };


  //---------------------------------------------------------------
  // Webpack
  //---------------------------------------------------------------

  webpack(webpackConfig, function(err, stats) {
    const log = function(stats) {
      util.log('[webpack]', stats.toString({
        chunks: false,
        colors: true,
        version: false,
        hash: false,
        maxModules: 30,
        modulesSort: '!size'
      }));
    };

    if (err) throw new util.PluginError('webpack', err);

    if (stats.hasErrors()) {
      const info = stats.toJson('errors-only');
      const body = stripAnsi(info.errors.join('/n'));
      global.browserSync.notify(body, 30000);
    } else {
      global.browserSync.reload({ once: true });
    }
    log(stats);
    done();
  });
});
