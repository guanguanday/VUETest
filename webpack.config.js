var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env = {}) =>{
  console.log(`------------------- ${env.production?'生产':'开发'}环境 -------------------`);
  var plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
  if(!env.production){
    plugins = [];
  }
  plugins.push(new CopyWebpackPlugin([{
    from: 'static',
    to: 'static'
  }]));
  plugins.push(new HtmlWebpackPlugin({template: 'index.html'}));
  plugins.push(new CleanWebpackPlugin(['dist']));

  return {
    entry: './src/main.js',//入口
    output: {
      path: path.resolve(__dirname, './dist'),//输出结果
      // publicPath: '',//publicPath项则被许多Webpack的插件用于在生产模式和开发模式下下更新内嵌到css、html，img文件里的url值
      filename: '[name].js',
      chunkFilename: '[id].chunk.js'
    },
    module: {
      rules: [
        //  使用vue-loader 加载 .vue 结尾的文件
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
            }
            // other vue-loader options go here
          }
        },
        // 使用babel 加载 .js 结尾的文件
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        // 加载图标
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        },
        //加载css
        {
          test: /\.css$/,
          loader: "style-loader!css-loader",
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          loader: "style-loader!css-loader!sass-loader!"
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    devServer: {//webpack-dev-server配置
      historyApiFallback: true,//不跳转
      noInfo: true,
      inline: true//实时刷新
    },
    performance: {
      hints: false
    },
    plugins:plugins,
    devtool: '#eval-source-map'//开发模式下更方便定位错误
  }
}
