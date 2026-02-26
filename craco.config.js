module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the MiniCssExtractPlugin and configure it to ignore order warnings
      const plugins = webpackConfig.plugins || [];
      const miniCssExtractPlugin = plugins.find(
        (plugin) => plugin && plugin.constructor && plugin.constructor.name === 'MiniCssExtractPlugin'
      );

      if (miniCssExtractPlugin && miniCssExtractPlugin.options) {
        miniCssExtractPlugin.options.ignoreOrder = true;
      }

      return webpackConfig;
    },
  },
  eslint: {
    enable: false,
  },
};
