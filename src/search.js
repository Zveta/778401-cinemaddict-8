import {Component} from './component.js';

class Search extends Component {
  constructor() {
    super();
    this._onSearch = null;
    this._onSearchChange = this._onSearchChange.bind(this);
  }

  set onSearch(fn) {
    this._onSearch = fn;
  }

  _onSearchChange(evt) {
    if (typeof this._onSearch === `function`) {
      this._onSearch(evt.target.value);
    }
  }

  get template() {
    return `<form class="header__search search">
    <input type="text" name="search" class="search__field" placeholder="Search">
    <button type="submit" class="visually-hidden">Search</button>
  </form>`.trim();
  }

  bind() {
    this._element.querySelector(`.search__field`).addEventListener(`keyup`, this._onSearchChange);
  }

  unbind() {
    this._element.querySelector(`.search__field`).removeEventListener(`keydown`, this._onSearchChange);
  }
}

export {Search};
