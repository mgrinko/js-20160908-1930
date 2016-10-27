'use strict';

class PhoneCatalogueBlockController {
  constructor(options) {
    this._el = options.element;

    this._phoneCatalogue = new ItemCatalogue({
      element: this._el.querySelector('[data-component="item-catalogue"]'),
      items: options.phones
    });

    this._phoneViewer = new ItemViewer({
      element: this._el.querySelector('[data-component="item-viewer"]'),
    });


    this._phoneCatalogue.getElement().addEventListener('itemSelected', this._onCatalogueItemSelected.bind(this));
  }

  _onCatalogueItemSelected(event) {
    alert(event.detail);

    // let phoneId = '123';
    // let phoneDetails = {};
    //
    //
    // this._phoneCatalogue.hide();
    // this._phoneViewer.show();
    // this._phoneViewer.render(phoneDetails);
  }
}