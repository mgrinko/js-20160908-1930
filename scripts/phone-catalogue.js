'use strict';

class PhoneCatalogue {
  constructor(options) {
    this._el = options.element;
    this._phones = options.phones;

    this._template = document.getElementById('phone-catalogue-template').innerHTML;
    this._templateFunction = _.template(this._template);

    this._render(this._phones);

    this._el.addEventListener('click', this._onItemDetailsLinkClick.bind(this));
  }

  getElement() {
    return this._el;
  }

  _render(phones) {
    this._el.innerHTML = this._templateFunction({
      items: phones
    });
  }

  _onItemDetailsLinkClick(event) {
    let link = event.target.closest('[data-element="item-details-link"]');

    if (!link) {
      return;
    }

    let item = link.closest('[data-element="catalogue-item"]');

    if (!item) {
      return;
    }

    this._triggerItemSelectedEvent(item.dataset.itemId);
  }

  _triggerItemSelectedEvent(detail) {
    let event = new CustomEvent("itemSelected", {
      detail: detail
    });

    this._el.dispatchEvent(event);
  }
}