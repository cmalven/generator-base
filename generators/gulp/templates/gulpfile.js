require('dotenv').config();
const { defaultTask, build } = require('@malven/gulp-tasks');

//
//   Config
//
//////////////////////////////////////////////////////////////////////

global.GULP_CONFIG = {
  env: process.env.NODE_ENV === 'production' ? 'production' : 'dev',

  paths: {
    dist: '<%= rootDistPath %>/',

    styleSrc: 'src/styles/',
    styleDist: '<%= rootDistPath %>/styles/',

    scriptSrc: 'src/scripts/',
    scriptDist: '<%= rootDistPath %>/scripts/',
    scriptPublic: '<%= publicDistPath %>scripts/',

    templateSrc: '<%= templateSrc %>',
    templateDist: '<%= templateDist %>',

    imageSrc: 'src/images/',
    imageDist: '<%= rootDistPath %>/images/',

    styleCopyPaths: [

    ],

    scriptCopyPaths: [
      'vendor',
    ],

    distCopyPaths: [<% if (distCopyPath) { %>
      '<%= distCopyPath %>',
    <% } %>],
  },

  browsersync: {
    port: <%= Math.ceil(String(Math.floor(Math.random() * 999)).padStart(3, '0') / 10) * 10 + 3000 %>,
    useProxy: <%= useProxy %>,
    proxyUrl: process.env.BROWSERSYNC_PROXY_URL || process.env.PRIMARY_SITE_URL  || process.env.SITE_URL || undefined,
    serverBaseDir: '<%= serverBaseDir %>',
  },

  scripts: {
    entries: [
      'main',
    ],
  },

  styles: {
    entries: [
      'main',
    ],
  },

  <%_ if (useTwig) { -%>
  twig: {
    enable: true,
  },
  <%_ } -%>
};

// Export tasks
module.exports = {
  default: defaultTask,
  build,
};

