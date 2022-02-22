import { Modu } from '@malven/modu';

import addIntersection from '../utils/addIntersection';

/**
 * Handles reveal animations on scroll.
 */

export default class extends Modu {
  visibleClass = 'is-visible';
  observer;

  constructor(m) {
    super(m);
  }

  init = () => {
    let triggerEl = this.el;

    // Change the trigger element based on settings
    const trigger = this.getData('trigger');
    if (trigger === 'parent') {
      triggerEl = this.el.parentNode;
    } else if (trigger) {
      triggerEl = this.el.closest(trigger);
    }

    this.observer = addIntersection(triggerEl, {
      rootMargin: '0px 0px -80px 0px',
      inHandler: (el, direction, isAlreadyRevealed) => {
        // Fires when element enters view
        if (!isAlreadyRevealed) {
          this.el.classList.add(this.visibleClass);
        }
      },
    });
  };

  cleanup = () => {
    this.observer.disconnect();
  };
}
