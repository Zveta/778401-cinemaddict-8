import Component from "./component.js";

export default class Filter extends Component {
  constructor(data) {
    super();
    this._caption = data.caption;
    this._amount = null;
    this._onClick = null;
    this._oBtnClick = this._oBtnClick.bind(this);
  }

  _oBtnClick(evt) {
    evt.preventDefault();
    return typeof this._onClick === `function` && this._onClick();
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  _updateAmount() {
    const amount = this._element.querySelector(`.main-navigation__item-count`);
    amount.textContent = this._amount;
  }

  getAmount(data) {
    this._amount = data.length;
    this._updateAmount();
  }

  get template() {
    return `
      <a href="#${this._caption.toLowerCase()}" class="main-navigation__item filter ${this._caption === `All` ? `main-navigation__item--active` : ``}">
      ${this._caption}
      ${this._caption !== `All` ? `<span class="main-navigation__item-count">${this.amount}</span>` : `<span class="main-navigation__item-count visually-hidden"></span>`}
      </a>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._oBtnClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._oBtnClick);
  }
}
