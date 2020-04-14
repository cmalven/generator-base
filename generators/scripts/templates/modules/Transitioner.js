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

  // No Private Vars

  //
  //   Public Vars
  //
  //////////////////////////////////////////////////////////////////////

  let self = Object.assign({}, {
    visibleClass: 'is-visible',
    transitionImmediatelySelector: ''
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
    const selectors = [
      '.h-transition',
      '.h-transition-fade',
      '.h-transition-up',
      '.h-transition-up-less',
      '.h-transition-down',
      '.h-transition-left',
      '.h-transition-right',
      '.h-transition-animate',
      '.h-transition-stagger-children'
    ].join(', ');

    if (typeof els === 'undefined') {
      els = document.querySelector('body');
    }

    const $collection = $(els).filter(selectors);
    $collection.add($(els).find(selectors)).get().forEach(element => {
      if (transitionImmediately) {
        return element.classList.add(self.visibleClass);
      }

      addIntersection(
        $(element).get(),
        {
          rootMargin: '0px 0px -50px 0px',
          inHandler: (el, direction) => {
            element.classList.add(self.visibleClass);

            if (element.classList.contains('h-transition-stagger-children')) {
              element.querySelectorAll(selectors).forEach(childElement => {
                childElement.classList.add(self.visibleClass);
              });
            }
          }
        }
      );
    });
  };


  //
  //   Initialize
  //
  //////////////////////////////////////////////////////////////////////

  _init();

  // Return the Object
  return self;
};

export default Transitioner;
