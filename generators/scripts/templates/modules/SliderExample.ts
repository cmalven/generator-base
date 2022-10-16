import { ModuOptions } from '@malven/modu';
import SliderCore from './SliderCore';
import { Options } from '@splidejs/splide';

/**
 * Basic example of slider. Rename and reuse.
 */

export default class extends SliderCore {
  options: Options;

  constructor(m: ModuOptions) {
    super(m);

    const options = JSON.parse(this.getData('options') ?? '{}');
    this.options = Object.assign({
      type: 'loop',
      drag: true,
      speed: 800,
      interval: 3000,
      autoplay: true,
      pagination: true,
      arrows: true,
      pauseOnHover: true,
      arrowPath: 'M25.7457 18.7009L18.3257 11.2809L19.6066 10L29.2132 19.6066L19.6066 29.2132L18.3257 27.9323L25.7457 20.5123H10V18.7009H25.7457Z',
    }, options);
  }

  init = () => {
    const slideCount = this.getAll('slide').length;
    if (slideCount < 2) return;

    // Add slider classes
    this.addSliderClasses();

    // Get slider
    this.slider = this.getSlider(this.el, this.options);

    super.init();
  };
}
