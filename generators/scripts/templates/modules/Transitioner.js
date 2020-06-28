import $ from 'cash-dom';
import addIntersection from './addIntersection';

/**
 * Handles global transitions for all site content.
 *
 * To transition in a piece of content, add one of the
 * `h-transition-{direction}` helper classes found in
 * /src/styles/base/_helpers.scss
 *
 * @class    Transitioner
 * @param    {object}  options  Options for the object
 * @return   {object}  The object
 */
const Transitioner = function(options) {
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

  self.add = (els, transitionImmediately = false) => {
    const selectors = getTransitionEls().join(', ');

    if (typeof els === 'undefined') {
      els = document.querySelector('body');
    }

    const $collection = $(els).filter(selectors);
    $collection.add($(els).find(selectors)).get().forEach(element => {
      if (transitionImmediately) {
        return element.classList.add(self.visibleClass);
      }

      // Determine the root margin
      const customRootMargin = element.getAttribute(self.dataRootMarginAttr);
      const rootMargin = customRootMargin
        ? customRootMargin
        : '0px 0px -70px 0px';

      const observer = addIntersection(
        $(element).get(),
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

      observers.push(observer);
    });
  };

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
  ];
};

export {
  Transitioner,
  getTransitionEls,
};
