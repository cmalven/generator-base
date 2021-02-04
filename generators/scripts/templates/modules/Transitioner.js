import addIntersection from './addIntersection';

/**
 * Handles global transitions for all site content using Intersection Observer.
 *
 * To transition in a piece of content, add one of the
 * `h-transition-{direction}` helper classes found in
 * /src/styles/base/_helpers.scss
 *
 * @class    Transitioner
 * @param    {object}  options               Options for the object
 * @param    {string}  options.visibleClass  Class to apply when an element enters the viewport
 * @return   {object}  The Transitioner object
 *
 * @example
 * const myTransitioner = new Transitioner();
 */
const Transitioner = function(options = {}) {
  //
  //   Private Vars
  //
  //////////////////////////////////////////////////////////////////////

  let observers = [];


  //
  //   Public Vars
  //
  //////////////////////////////////////////////////////////////////////

  let self = Object.assign({}, {
    visibleClass: 'is-visible',
    transitionImmediatelySelector: '',
    dataRootMarginAttr: 'data-transitioner-root-margin',
  }, options);


  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  const _init = function() {
    _transitionImmediately();
    _addEventListeners();
  };

  const _transitionImmediately = function() {
    if (!self.transitionImmediatelySelector.length) return;
    document.querySelectorAll(self.transitionImmediatelySelector).forEach(element => {
      element.classList.add(self.visibleClass);
    });
  };

  const _addEventListeners = function() {
    self.add();
  };


  //
  //   Public Methods
  //
  //////////////////////////////////////////////////////////////////////

  /**
   * Add viewport intersection detection to a collection of elements.
   * @param {string} parentSelector          Parent element selector to search for intersecting children.
   * @param {boolean} transitionImmediately  If set, the element(s) will immediately transition on page load
   *
   * @example
   * myTransitioner.add(
   *   document.querySelectorAll('.body'),
   *   false
   * );
   */
  self.add = (parentSelector= 'body', transitionImmediately = false) => {
    const selectors = getTransitionEls().join(', ');

    // Create an empty element collection
    let elCollection = [];

    // Find all parent elements
    const parentEls = document.querySelectorAll(parentSelector);

    // Any parent element that matches our selectors is eligible for revealing
    elCollection.concat(Array.prototype.filter.call(document.querySelectorAll(parentSelector), parentEl => {
      return !!parentEl.querySelectorAll(selectors).length;
    }));

    // Add every child of the parent that matches our selectors
    parentEls.forEach(parentEl => {
      parentEl.querySelectorAll(selectors).forEach(matchingChild => {
        elCollection.push(matchingChild);
      });
    });

    // Add intersection listeners to all machine elements
    elCollection.forEach(element => {
      // Immediately transition all elements if applicable
      if (transitionImmediately) {
        return element.classList.add(self.visibleClass);
      }

      // Determine the root margin
      const customRootMargin = element.getAttribute(self.dataRootMarginAttr);
      const rootMargin = customRootMargin
        ? customRootMargin
        : '0px 0px -70px 0px';

      // Add intersections
      const observer = addIntersection(
        element,
        {
          rootMargin: rootMargin,
          inHandler: (el, direction) => {
            element.classList.add(self.visibleClass);

            if (element.classList.contains('h-transition-stagger-children')) {
              element.querySelectorAll(selectors).forEach(childElement => {
                childElement.classList.add(self.visibleClass);
              });
            }
          },
        }
      );

      // Add to our collection of all observers
      observers.push(observer);
    });
  };

  /**
   * Destroys all previously added intersection observers.
   */
  self.destroyObservers = () => {
    observers.forEach(observer => {
      observer.disconnect();
    });
    observers = [];
  };


  //
  //   Initialize
  //
  //////////////////////////////////////////////////////////////////////

  _init();

  // Return the Object
  return self;
};

const getTransitionEls = () => {
  return [
    '.h-transition',
    '.h-transition-fade',
    '.h-transition-up',
    '.h-transition-up-less',
    '.h-transition-down',
    '.h-transition-left',
    '.h-transition-right',
    '.h-transition-scale',
    '.h-transition-animate',
    '.h-transition-stagger-children',
    '.l-section',
  ];
};

export {
  Transitioner,
  getTransitionEls,
};
