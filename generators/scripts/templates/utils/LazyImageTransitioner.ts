import type { LazyBeforeUnveilEvent } from 'lazysizes/types/global';

/**
 * Nicely transitions images via lazy sizes hooks. Applies a class to the parent of a lazy loaded image when that image has been successfully loaded.
 */

class LazyImageTransitioner {
  selector = '.image';
  readyClass = 'is-ready';

  constructor() {
    this.init();
  }

  init = () => {
    this.addEventListeners();
  };

  addEventListeners = () => {
    // Handle a lazysizes loaded image
    document.addEventListener('lazybeforeunveil', (evt) => {
      this.makeParentVisible(evt);
    });
  };

  makeParentVisible = (evt: LazyBeforeUnveilEvent) => {
    const parentEl = evt.target.closest(this.selector);
    if (parentEl) {
      parentEl.classList.add(this.readyClass);
    }
  };
}

export default LazyImageTransitioner;
