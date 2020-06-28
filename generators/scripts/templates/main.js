<%_ if (deps.includes('lazysizes')) { _%>
import 'lazysizes';
import 'lazysizes/plugins/bgset/ls.bgset.js';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';
import LazyImageTransitioner from './modules/LazyImageTransitioner';

// Conditionally load object fit polyfill if needed
if (!('object-fit' in document.createElement('a').style)) {
  require('lazysizes/plugins/object-fit/ls.object-fit');
}

<%_ } _%>
import { Transitioner } from './modules/Transitioner';

//
//   Global App Variable
//
//////////////////////////////////////////////////////////////////////

window.APP = window.APP || {};


//
//   App Initiation
//
//////////////////////////////////////////////////////////////////////

APP.init = function() {
  //
  //   Transition content on scroll
  //

  new Transitioner();
  <%_ if (deps.includes('lazysizes')) { _%>

  //
  //   Image Transitions
  //

  new LazyImageTransitioner();
  <%_ } _%>
};


//
//   Kickoff
//
//////////////////////////////////////////////////////////////////////

APP.init();
