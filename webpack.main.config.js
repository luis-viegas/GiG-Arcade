const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const ASSET_PATH = process.env.ASSET_PATH || '/public';

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */

  entry: './src/main.js',

  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
    
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, './src/node_electron/pullDatabaseFromRep.ps1'), 
          to: path.resolve(__dirname, './.webpack/main')
        },
        { 
          from: path.resolve(__dirname, './public/pop_up'), 
          to: path.resolve(__dirname, './.webpack/renderer/pop_up')
        },
        
      ],
    }),
  ],

};
