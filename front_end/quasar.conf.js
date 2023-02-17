module.exports = function (/* ctx */) {
  return {
    supportTS: false,
    preFetch: true,
    boot: [

      "i18n",
      "axios"
    ],

    css: [
      "app.scss"
    ],

    extras: [

      "roboto-font",
      "material-icons"
    ],

    build: {
      distDir: "../src/main/resources/META-INF/resources",
      vueRouterMode: "history",
      scopeHoisting: true,

      preloadChunks: true,
      showProgress: true,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /node_modules/
        });
      }
    },

    devServer: {
      https: false,
      port: 8081,
      open: true
    },

    framework: {
      iconSet: "svg-mdi-v5",
      lang: "en-us",
      config: {},

      importStrategy: "auto",

      components: [],
      plugins: [
        "Meta",
        "LocalStorage",
        "SessionStorage"
      ]
    },
    animations: [],
    ssr: {
      pwa: true
    },

    pwa: {
      workboxPluginMode: "GenerateSW",
      workboxOptions: {},
      manifest: {
        name: "Demo App",
        short_name: "Demo App",
        description: "A Quasar Framework app",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },
    cordova: {
    },

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      bundler: "packager",

      packager: {
      },

      builder: {
        appId: "frontend"
      },

      nodeIntegration: true,

      extendWebpack(/* cfg */) {
      }
    }
  };
};
