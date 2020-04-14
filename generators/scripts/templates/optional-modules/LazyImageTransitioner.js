import $ from 'cash-dom';

/**
 * Nicely transitions images via lazy sizes hooks
 *
 * @class    LazyImageTransitioner
 * @param    {object}  options  Options for the object
 * @return   {object}  The object
 */
const LazyImageTransitioner = function(options) {
  //
  //   Public Vars
  //
  //////////////////////////////////////////////////////////////////////

  let self = Object.assign({}, {
    selector: '.image--wipe',
    visibleClass: 'is-visible',
  }, options);


  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  const _init = () => {
    _addEventListeners();
  };

  const _addEventListeners = () => {
    document.addEventListener('lazyloaded', function(evt) {
      const $parentEl = $(evt.target).closest(self.selector);
      if ($parentEl) {
        $parentEl.addClass(self.visibleClass);
      }
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

export default LazyImageTransitioner;
