const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      fallback: {
        "buffer": require.resolve("buffer"),
        "request": require.resolve("retry-request"),
        "constants": require.resolve("constants-browserify"),
        "tls": require.resolve('tls'),
        "fs": false,//require.resolve("fs-extra"),
        "child_process": false,//require.resolve("child_process"),
        "net": require.resolve("net"),

        "os": require.resolve("os-browserify/browser"),
        "path": require.resolve("path-browserify"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "zlib": require.resolve("browserify-zlib"),

        "url": require.resolve("url/"),
        "assert": require.resolve("assert/"),
        "crypto": require.resolve("crypto-browserify"),
        "util": require.resolve("util/"),
        "stream": require.resolve('stream-browserify'),
      },
    },
    module: {
      rules: [
        {
          test: /\.sass$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                indentedSyntax: true,
              },
            },
          ],
        },
      ],
    }
  },
  lintOnSave: false,
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
