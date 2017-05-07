var path = require("path");
module.exports = {
  entry: {
    app: ["./client/client.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: "babel-loader",
        exclude: "/node-modules/",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};
