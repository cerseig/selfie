module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/index.scss";
        `
      }
    }
  },
  configureWebpack: {
    devServer: {
      https: true
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'translations',
      enableInSFC: false
    }
  }
}
