const config = require('../config');
const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const util = require('util');
const ESLintPlugin = require('eslint-webpack-plugin');
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
    new ESLintPlugin(),
  ];

  // Bundle analyzer if requested
  if (process.env.ANALYZE_BUNDLE === 'true') {
    plugins = plugins.concat([
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    ]);
  }


  //---------------------------------------------------------------
  // Config
  //---------------------------------------------------------------

  const webpackConfig = {
    mode: ENV,

    entry: config.scripts.entryFiles.reduce(function(result, name) {
      result[name] = path.resolve('./' + config.paths.scriptSrc + name);
      return result;
    }, {}),

    output: {
      path: path.resolve('./' + config.paths.scriptDist),
      filename: '[name].bundle.js',
      publicPath: config.paths.scriptPublic,
      chunkFilename: '[name].[contenthash].bundle.js',
    },

    resolve: {
      modules: [
        path.resolve('./node_modules'),
        path.resolve('./' + config.paths.scriptSrc + 'vendor'),
      ],
      alias: config.scripts.aliases,
    },

    devtool: ENV === DEV ? 'eval-cheap-source-map': false,

    module: {
      rules: [
        {
          test: /\.(glsl|frag|vert)$/,
          exclude: /node_modules/,
          use: [
            'raw-loader',
            'glslify-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },

    optimization: {
      minimizer: [
        new UglifyJsPlugin(),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          defaultVendors: false,
        },
      },
    },

    plugins: plugins,
  };


  //---------------------------------------------------------------
  // Webpack
  //---------------------------------------------------------------

  webpack(webpackConfig, function(err, stats) {
    if (err) throw new util.PluginError('webpack', err);

    global.browserSync.reload({ once: true });

    // Stats
    const log = function(stats) {
      util.log('[webpack]', stats.toString({
        chunks: false,
        colors: true,
        version: false,
        hash: false,
        maxModules: 0,
        modulesSort: '!size',
      }));
    };
    log(stats);

    done();
  });
});
