// webpack.config.js
module.exports = {
  // ... other configurations
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify")
    }
  }
};