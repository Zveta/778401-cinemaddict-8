export const getFilterElement = function (caption, amount, isChecked = false) {
  return `
  <a href="#${caption.toLowerCase()}" class="main-navigation__item filter ${isChecked ? `main-navigation__item--active` : ``}">
    ${caption}
    ${caption !== `All` ? `<span class="main-navigation__item-count">${amount}</span>` : ``}
  </a>
    `;
};
