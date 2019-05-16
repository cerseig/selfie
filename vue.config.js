const fs = require('fs')

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
      port: 8080,
      http2: true,
      https: {
        key: fs.readFileSync('server.key.pem'),
        cert: fs.readFileSync('server.crt.pem')
      }
    }
  },
  pwa: {

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
