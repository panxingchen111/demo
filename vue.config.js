const resolve = dir => require("path").join(__dirname, dir);
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const env = process.env.NODE_ENV;
// const publicPath = env === "production" ? "/" : "/";

// 引入等比适配插件
// const px2rem = require('postcss-px2rem')

// 配置基本大小
// const postcss = px2rem({
//     // 基准大小 baseSize，需要和rem.js中相同
//     remUnit: 14
// })
// 使用等比适配插件
console.log(`run env:${env}`);
module.exports = {
  devServer: {
    host: "localhost",
    port: 8023,
    compress: true,
    https: false,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api": {
        target: "https://localhost:8023",
        changeOrigin: true, // 设置这个参数可以避免跨域
        // pathRewrite: {
        //   "^/api": "/mock"
        // }
      }
    },
  },
  transpileDependencies: ["vuetify"],
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: config => {
    if (env === "development") {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          openAnalyzer: false,
          analyzerPort: "9001"
        })
      );
    }
    if (env === "production") {
      config.performance = {
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
          // 提供资源文件名的断言函数
          return (
            assetFilename.endsWith(".css") || assetFilename.endsWith(".js")
          );
        }
      };
    }
    config.externals = {
      AMap: "AMap",
      AMapUI: "AMapUI",
    };
    /*plugins: [
      new webpack.ProvidePlugin({
        $: 'zepto',
        Zepto: 'zepto',
        'window.Zepto': 'zepto'
      }),
    ]*/
  },
  chainWebpack: webpackConfig => {
    webpackConfig.resolve.symlinks(true);

    webpackConfig.resolve.alias.set("@", resolve("src"));

    /*const entry = webpackConfig.entry('app')
    entry
      .add('babel-polyfill')
      .end()*/

    webpackConfig.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .use("i18n")
      .loader("@kazupon/vue-i18n-loader");

    webpackConfig.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, {
        limit: 10240
      }));
  },
  // lintOnSave: true,
  // css: {
  //     loaderOptions: {
  //         postcss: {
  //             plugins: [
  //                 postcss
  //             ]
  //         }
  //     }
  // }
};
