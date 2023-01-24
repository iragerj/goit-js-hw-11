export default class LoadMoreBtn {
  constructor(hidden) {
    this.button = document.querySelector('.load-more');

    hidden && this.hide();
  }

  hide() {
    this.button.classList.add('is-hidden');
  }

  show() {
    this.button.classList.remove('is-hidden');
  }
}
