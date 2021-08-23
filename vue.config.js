const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// Generate pages object
const pagesObj = {};

const chromeName = ["popup", "options", "content", "background"];

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: "public/index.html",
    filename: `${name}.html`
  };
});

const plugins =
  process.env.NODE_ENV === "production"
    ? [
      {
        from: path.resolve("src/manifest.production.json"),
        to: `${path.resolve("dist")}/manifest.json`
      }
    ]
    : [
      {
        from: path.resolve("src/manifest.development.json"),
        to: `${path.resolve("dist")}/manifest.json`
      }
    ];

module.exports = {
  pages: pagesObj,
  configureWebpack: {
    entry: {
      content: './src/content/index.js'
    },
    output: {
      filename: 'js/[name].js'
    },
    plugins: [CopyWebpackPlugin(plugins)]
  },
  chainWebpack: config => {
    // 处理字体文件名，去除hash值
    const imgRule = config.module.rule('images')
    const fontsRule = config.module.rule('fonts')
    fontsRule.uses.clear()
    imgRule.uses.clear()
    fontsRule.test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url')
      .loader('url-loader')
      .options({
        limit: 1000,
        name: 'fonts/[name].[ext]'
      })
    imgRule.test(/\.(png|jpg|gif|webp)$/i)
      .use('url')
      .loader('url-loader')
      .options({
        limit: 1000,
        name: 'img/[name].[ext]'
      })
  }

};
