module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'https://a-m-y.netlify.com' : 'https://localhost:8080',
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
