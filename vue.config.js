module.exports = {
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
