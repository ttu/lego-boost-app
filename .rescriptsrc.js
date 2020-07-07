const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = [
  config => {
    config.plugins.push(
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['typescript'],
        features: ['!gotoSymbol'],
      })
    );
    return config;
  },
];
