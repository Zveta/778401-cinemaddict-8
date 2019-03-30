import {Component} from "./component.js";

class Filter extends Component {
  constructor(data) {
    super();
    this._caption = data.caption;
    this._amount = data.amount;
    this._isChecked = data.isChecked;

    this._onFilter = null;
    this._onFilterButtonClick = this._onFilterButtonClick.bind(this);
  }

  _onFilterButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onFilter === `function` && this._onFilter();
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
      <a href="#${this._caption.toLowerCase()}" class="main-navigation__item filter ${this._isChecked ? `main-navigation__item--active` : ``}">
      ${this._caption}
      ${this._caption !== `All` ? `<span class="main-navigation__item-count">${this._amount}</span>` : ``}
      </a>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterButtonClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterButtonClick);
  }
}

export {Filter};
