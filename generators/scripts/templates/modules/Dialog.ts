import { Modu, ModuOptions } from '@malven/modu';
import A11yDialog from 'a11y-dialog';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

/**
 * Generic dialog module.
 *
 * Uses https://a11y-dialog.netlify.app
 */

export default class extends Modu {
  closeDelay = 0;
  dialog!: A11yDialog;

  constructor(m: ModuOptions) {
    super(m);

    this.closeDelay = this.getData('close-delay')
      ? Number(this.getData('close-delay'))
      : 400;
  }

  init() {
    this.dialog = new A11yDialog(this.el);
    this.dialog.on('hide', this.hideDialog);

    // Listen for other dialogs to open and close this one
    this.on('Dialog', 'open', () => {
      this.close();
    });
  }

  open() {
    this.showDialog();
    this.dialog.show();
    this.emit('open', null);
  }

  close() {
    this.dialog.hide();
  }

  showDialog = () => {
    this.el.classList.add('is-opening');
    window.requestAnimationFrame(() => {
      this.el.classList.add('is-open');
    });
    disableBodyScroll(this.el, { reserveScrollBarGap: true });
    this.call('DialogToggle', 'set', true, this.key);
    this.el.scrollTop = 0;
  };

  hideDialog = () => {
    this.el.classList.remove('is-open');
    window.setTimeout(() => {
      enableBodyScroll(this.el);
      this.el.classList.remove('is-opening');
    }, this.closeDelay);
    this.call('DialogToggle', 'set', false, this.key);
  };

  cleanup = () => {
    // Body scroll lock
    enableBodyScroll(this.el);

    // Destroy dialog
    this.dialog.destroy();
  };
}
