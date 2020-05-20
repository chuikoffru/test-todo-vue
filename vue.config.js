module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/sass/_variables.sass"',
      },
    },
  },
};
