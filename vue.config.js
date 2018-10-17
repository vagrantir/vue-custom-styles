var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  chainWebpack: config => {
  },
  css: {
    extract: false,
  },
};
/**
 * Example
 */
// module.exports = {
//   chainWebpack: config => {
//     config
//       .plugin('html')
//       .tap(args => {
//         args[0].template = '/Users/username/proj/app/templates/index.html'
//         return args
//       })
//   }
// };
