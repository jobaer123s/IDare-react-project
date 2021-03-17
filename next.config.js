const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

const withPlugins = require('next-compose-plugins');
module.exports = withPlugins([
    [withCSS, { cssModules: true  }],
    [withImages],
], {
    serverRuntimeConfig: {   serverRuntimeConfigValue: 'test server'  },
    // publicRuntimeConfig: {   publicRuntimeConfigValue: {apiUrl:'http://127.0.0.1:5000'} },
   // publicRuntimeConfig: {   publicRuntimeConfigValue: {apiUrl:process.env.apiUrl.trim()} },
    webpack: (config, options) => {   return config;   },exportTrailingSlash: true
});
