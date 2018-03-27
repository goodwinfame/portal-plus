const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpack = require('webpack')

module.exports = (webpackConfig, env) => {
  const production = env === 'production';
  
  // FilenameHash
  webpackConfig.output.chunkFilename = '[name].[chunkhash].js'

  if (production) {
    // 上线环境使用分包打包方式  
    webpackConfig.entry = {
        index: './src/index.js',
        portalPlus: './src/plus/index.js',
        
    }
   

    if (webpackConfig.module) {
    // ClassnameHash
      webpackConfig.module.rules.map((item) => {
       
        if (String(item.test) === '/\\.less$/' || String(item.test) === '/\\.css/') {
          //过滤掉ExtractTextPlugin loader 以免css js分开打包
          item.use[0] = { 
            loader: 'style',
            options: {
              singleton: true,
            },
          };
          item.use.filter(iitem => iitem.loader === 'css')[0].options.localIdentName = '[hash:base64:5]'
        }
        return item
      })
     
    }

    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
    )
  }
 

  //过滤ExtractTextPlugin plugin
  webpackConfig.plugins = webpackConfig.plugins.filter(plugin=>!(plugin instanceof ExtractTextPlugin)).concat([
    new CopyWebpackPlugin([
      {
        from: 'src/public',
        to: production ? '../' : webpackConfig.output.outputPath,
      },
    ]),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.ejs`,
      filename: production ? '../index.html' : 'index.html',
      minify: production ? {
        collapseWhitespace: true,
      } : null,
      hash: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'portalPlus'
    }),
  ])

  // Alias
  webpackConfig.resolve.alias = {
    
  }
  webpackConfig.externals = {
  }
  return webpackConfig
}
