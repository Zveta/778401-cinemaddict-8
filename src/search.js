import Component from './component.js';

export default class Search extends Component {
  constructor() {
    super();
    this._onChange = null;
    this._onInputChange = this._onInputChange.bind(this);
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  _onInputChange(evt) {
    if (typeof this._onChange === `function`) {
      this._onChange(evt.target.value);
    }
  }

  get template() {
    return `<form class="header__search search">
    <input type="text" name="search" class="search__field" placeholder="Search">
    <button type="submit" class="visually-hidden">Search</button>
  </form>`.trim();
  }

  bind() {
    this._input = this._element.querySelector(`.search__field`);
    this._input.addEventListener(`keyup`, this._onInputChange);
  }

  unbind() {
    this._input.removeEventListener(`keydown`, this._onInputChange);
  }
}
