const { version } = require('./package.json');

export default {
    // entry: 'src/index.js',
   
    publicPath: `/${version}/`,
    outputPath: `./dist/${version}`,
    // 接口代理示例
    proxy: {
        "/cloud/v1": {
            "target": "https://192.168.80.38/",
            "changeOrigin": true,
            "secure": false,
            "pathRewrite": { "^/" : "" }
          }
    },
    env: {
        development: {
          extraBabelPlugins: [
            "transform-runtime",
          ]
        },
        production: {
          extraBabelPlugins: [
            "transform-runtime",
          ],
        }
      },
     
    
  }