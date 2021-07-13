const path = require('path')
const nodeExternals = require('webpack-node-externals')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')
const webpack = require('webpack')

module.exports = {
  entry: './src/fate-server.ts',
  output: {
    filename: 'fate-server.js',
    path: path.resolve(__dirname, 'dist'),
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  devServer: {
    contentBase: './dist'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'eval-source-map',
  mode: 'development',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'source-map-loader',
        exclude: /node_modules/
      }

    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({}),
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ['echo "===> Starting packing with WEBPACK 5"'],
        blocking: true,
        parallel: false
      },
      onDoneWatch: {
        scripts: ['echo "===> onDoneWatch"', 'npm run start:dev'],
        blocking: false,
        parallel: true
      },
      onBeforeNormalRun: {
        scripts: ['echo "===> onBeforeNormalRun"'] // FOr some reason this is needed otherwise onDoneWatch will be executed on a normal build
      }
    })
  ]
}
