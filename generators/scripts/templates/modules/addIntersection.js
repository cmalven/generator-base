/**
 * Creates basic "waypoint" functionality using the
 * Intersection Observer API.
 *
 * An Intersection Observer polyfill may be necessary
 * in some older browsers:
 *
 * https://caniuse.com/#feat=intersectionobserver
 *
 * @param {NodeList} el - List of elements to observe
 * @param {object} options - Available options
 * @param {string} options.rootMargin - Margins to apply to the viewport
 * @param {function} options.inHandler - Callback to fire when entering viewport
 * @param {function} options.outHandler - Callback to fire when exiting viewport
 * @param {function} options.atHandler - Callback to fire when fully in viewport
 *
 * @example
 *
 *    import addIntersection from './modules/addIntersection';
 *
 *    addIntersection(
 *      document.querySelectorAll('.js-foo'),
 *      {
 *        rootMargin: '0px 0px -100px 0px',
 *        inHandler: (el, direction) => {
 *          // Fires when element enters view
 *        },
 *        outHandler: (el, direction) => {
 *          // Fires when element exits view
 *        }
 *      }
 *    );
 */

export default (el, options = {}) => {
  let positions = {};
  el.forEach(element => {
    const uid = Math.floor(Math.random() * 1000000);
    element.setAttribute('data-intersection-id', uid);
    positions[uid] = {
      previousY: 0,
      previousRatio: 0,
    };
  });

  // Defaults
  const {
    rootMargin = '0px 0px -100px 0px',
    inHandler = direction => {},
    outHandler = direction => {},
    atHandler = direction => {},
    ratioSteps = 20,
  } = options;

  const add = () => {
    let observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const uid = entry.target.getAttribute('data-intersection-id');
          if (!positions[uid]) return;
          const currentY = entry.boundingClientRect.y;
          const previousY = positions[uid].previousY;
          const currentRatio = entry.intersectionRatio;
          const previousRatio = positions[uid].previousRatio;

          const dir = currentY < previousY
            ? 'down'
            : 'up';

          const status = currentRatio < previousRatio
            ? 'exiting'
            : 'entering';

          // Exiting top or bottom
          if (currentRatio <= 0 && status === 'exiting') {
            outHandler.call(this, entry.target, dir);
          }

          // Entering top or bottom
          if (currentRatio > 0 && status === 'entering') {
            inHandler.call(this, entry.target, dir);
          }

          // Fully visible
          if (currentRatio >= 1 && status === 'entering') {
            atHandler.call(this, entry.target, dir);
          }

          positions[uid].previousY = currentY;
          positions[uid].previousRatio = currentRatio;
        });
      },
      {
        rootMargin: rootMargin,
        threshold: Array(ratioSteps + 1).fill(0).map((_, idx) => idx / ratioSteps || 0),
      }
    );

    el.forEach(element => {
      observer.observe(element);
    });
  };

  add();
};
