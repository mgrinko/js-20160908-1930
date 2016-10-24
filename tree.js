'use strict';

class Tree {
  constructor(options) {
    var markup = document.getElementById('tree-template').innerHTML;

    this._templateFunction = _.template(markup);

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

    return this._templateFunction({
      data: obj,
      createTree: this._createTreeHTML.bind(this)
    });
  }

  _isObjectEmpty(obj) {
    for (var key in obj) {
      return false;
    }

    return true;
  }
}