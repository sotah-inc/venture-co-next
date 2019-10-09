const withCSS = require('@zeit/next-css');
const sotahCore = require("@sotah-inc/core");

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: "[local]",
  },
  publicRuntimeConfig: {
    publicApiEndpoint: sotahCore.getEnvVar("PUBLIC_API_ENDPOINT")
  },
  serverRuntimeConfig: {
    serverApiEndpoint: sotahCore.getEnvVar("SERVER_API_ENDPOINT")
  }
});
