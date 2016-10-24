'use strict';

class PageController {
  constructor(options) {
    this._el = options.element;

    this._phoneCatalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phone-catalogue"]'),
      phones: options.phones
    });

    this._phoneViewer = new PhoneViewer({
      element: this._el.querySelector('[data-component="phone-viewer"]'),
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