const path = require('path');

module.exports = {
  dev: {
    assetsPublicPath: '/',
    port: 5005,
    styleLint: false,
    devtool: 'cheap-module-eval-source-map',
  },
  build: {
    assetsRoot: path.resolve(__dirname, './demo'),
    assetsPublicPath: '/willtable/',
    bundleAnalyzerReport: false,
  },
  release: {
    assetsRoot: path.resolve(__dirname, './dist'),
    assetsPublicPath: './',
    filename: 'qcc-editable-table',
    library: 'VueWilltable',
  },
};
