const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [ './src/index.tsx', './src/index.scss' ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js',
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'inline-source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".png"],
        alias: {
            "react": "@preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "@preact/compat",
            "react/jsx-runtime": "preact/jsx-runtime",
        }
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" },
            {
              test: /\.s[ac]ss$/i,
              use: [
                "style-loader",
                "css-loader",
                {
                  loader: "sass-loader",
                  options: {
                    // Prefer `dart-sass`
                    implementation: require("sass"),
                  },
                },
              ],
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i, 
              loader: 'file-loader',
              options: {
                name: '/assets/images/[name].[ext]'
              }
            }
        ],
    },
    plugins: [
      new HtmlWebpackPlugin({  // Also generate a test.html
        filename: 'index.html',
        template: 'src/index.html'
      })
    ]
    
};