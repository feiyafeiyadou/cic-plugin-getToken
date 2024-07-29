const path = require("path");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

module.exports = function override(config) {
  console.log(config.output);
  // aicic-plugin-getToken
  return {
    ...config,
    // output: {
    //   ...config.output,
    //   path: path.resolve(__dirname, "aicic-plugin-getToken"),
    //   // path: path.resolve(__dirname, "aicic-plugin-getToken"),
    // },
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "@": resolve("src"),
        src: resolve("src"),
      },
    },
  };
};
