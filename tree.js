'use strict';

class Tree {
  constructor(options) {
    this._el = options.element;
    this._data = options.data;

    this._el.addEventListener('click', this._onBranchTitleClick.bind(this));

    this._el.innerHTML = this._createTreeHTML(this._data);
    this._el.classList.add('tree');
  }

  _onBranchTitleClick(event) {
    var title = event.target.closest('.tree__branch-title');

    if (!title) {
      return;
    }

    this._toggleBranch(title.closest('.tree__branch'));
  }

  _toggleBranch(branchElement) {
    branchElement.classList.toggle('tree__branch--closed');
  }

  _createTreeHTML(obj) {
    if (this._isObjectEmpty(obj)) {
      return '';
    }

    var html = `<ul class="tree__branch-content">`;

    for (var key in obj) {
      html += `
          <li class="tree__branch">
            <span class="tree__branch-title">${key}</span>
            ${this._createTreeHTML(obj[key])}
          </li>
        `;
    }

    html += `</ul>`;

    return html;
  }

  _isObjectEmpty(obj) {
    for (var key in obj) {
      return false;
    }

    return true;
  }
}