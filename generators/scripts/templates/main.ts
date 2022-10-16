<%_ if (deps.includes('lazysizes')) { _%>
import 'lazysizes';
import 'lazysizes/plugins/bgset/ls.bgset.js';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';
import LazyImageTransitioner from './utils/LazyImageTransitioner';

// Conditionally load object fit polyfill if needed
if (!('object-fit' in document.createElement('a').style)) {
  require('lazysizes/plugins/object-fit/ls.object-fit');
}

//
//  Image Transitions
//

new LazyImageTransitioner();

<%_ } _%>
<%_ if (deps.includes('@malven/modu')) { _%>
import * as initialModules from './modules/initial';
import { App } from '@malven/modu';

const app = new App({
  initialModules,
  importMethod: module => import(`./modules/${module}.ts`),
});
app.init();
<%_ } _%>
