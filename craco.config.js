module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "stream": require.resolve("stream-browserify"),
          "buffer": require.resolve("buffer"),
          "util": require.resolve("util"),
          "assert": require.resolve("assert"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "os": require.resolve("os-browserify/browser"),
          "url": require.resolve("url"),
          "path": require.resolve("path-browserify"),
          "querystring": require.resolve("querystring-es3"),
          "timers": require.resolve("timers-browserify"),
          "vm": require.resolve("vm-browserify"),
          "fs": false,
          "net": false,
          "tls": false,
          "crypto": require.resolve("crypto-browserify"),
        },
      },
    },
  },
};