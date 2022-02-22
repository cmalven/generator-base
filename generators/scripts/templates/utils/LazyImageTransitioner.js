/**
 * Nicely transitions images via lazy sizes hooks. Applies a class to the parent of a lazy loaded image when that image has been successfully loaded.
 *
 * @class    LazyImageTransitioner
 * @param    {string}  options.selector    Selector for the parent of the lazy loaded image.
 * @param    {string}  options.readyClass  The class that will be applied to the parent when the image is loaded.
 * @return   {object}  The LazyImageTransitioner object
 */
const LazyImageTransitioner = function(options = {}) {
  //
  //   Public Vars
  //
  //////////////////////////////////////////////////////////////////////

  let self = Object.assign({}, {
    selector: '.image',
    readyClass: 'is-ready',
  }, options);


  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  const _init = () => {
    _addEventListeners();
  };

  const _addEventListeners = () => {
    // Handle a lazysizes loaded image
    document.addEventListener('lazyloaded', function(evt) {
      _makeParentVisible(evt);
    });
  };

  const _makeParentVisible = (evt) => {
    const parentEl = evt.target.closest(self.selector);
    if (parentEl) {
      parentEl.classList.add(self.readyClass);
    }
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
