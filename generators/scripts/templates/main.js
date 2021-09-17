<%_ if (deps.includes('lazysizes')) { _%>
import 'lazysizes';
import 'lazysizes/plugins/bgset/ls.bgset.js';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';

// Conditionally load object fit polyfill if needed
if (!('object-fit' in document.createElement('a').style)) {
  require('lazysizes/plugins/object-fit/ls.object-fit');
}

<%_ } _%>
<%_ if (deps.includes('@malven/modu')) { _%>
import { App } from '@malven/modu';

const app = new App({
    importMethod: module => import(/* webpackChunkName: "[request]" */ './modules/' + module + '.js'),
  });
app.init();
<%_ } _%>
