const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const portfinder = require('portfinder');

const config = {
  entry: {
    main: path.join(__dirname, "src/index.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html")
    })
  ],
  stats: "minimal",
  devtool: "source-map",
  mode: "development",
  devServer: {
    open: false,
    static: path.resolve(__dirname, './dist'),
    watchFiles: ['./src/**'],
    port: 4000, // This port will be replaced if busy
    hot: true,
  }
};


portfinder.getPortPromise({
    port: 4000, // port of departure to look for
    stopPort: 5000 // maximum port to aim for
}).then(port => {
    config.devServer.port = port;
});

module.exports = config;