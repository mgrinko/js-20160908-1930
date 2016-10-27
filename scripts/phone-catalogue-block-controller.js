'use strict';

let phoneDetailsStub = {
  "additionalFeatures": "Sensors: proximity, ambient light, barometer, gyroscope",
  "android": {
    "os": "Android 3.0",
    "ui": "Honeycomb"
  },
  "availability": [
    ""
  ],
  "battery": {
    "standbyTime": "336 hours",
    "talkTime": "24 hours",
    "type": "Other ( mAH)"
  },
  "camera": {
    "features": [
      "Flash",
      "Video"
    ],
    "primary": "5.0 megapixels"
  },
  "connectivity": {
    "bluetooth": "Bluetooth 2.1",
    "cell": "",
    "gps": true,
    "infrared": false,
    "wifi": "802.11 b/g/n"
  },
  "description": "Motorola XOOM with Wi-Fi has a super-powerful dual-core processor and Android\u2122 3.0 (Honeycomb) \u2014 the Android platform designed specifically for tablets. With its 10.1-inch HD widescreen display, you\u2019ll enjoy HD video in a thin, light, powerful and upgradeable tablet.",
  "display": {
    "screenResolution": "WXGA (1200 x 800)",
    "screenSize": "10.1 inches",
    "touchScreen": true
  },
  "hardware": {
    "accelerometer": true,
    "audioJack": "3.5mm",
    "cpu": "1 GHz Dual Core Tegra 2",
    "fmRadio": false,
    "physicalKeyboard": false,
    "usb": "USB 2.0"
  },
  "id": "motorola-xoom-with-wi-fi",
  "images": [
    "img/phones/motorola-xoom-with-wi-fi.0.jpg",
    "img/phones/motorola-xoom-with-wi-fi.1.jpg",
    "img/phones/motorola-xoom-with-wi-fi.2.jpg",
    "img/phones/motorola-xoom-with-wi-fi.3.jpg",
    "img/phones/motorola-xoom-with-wi-fi.4.jpg",
    "img/phones/motorola-xoom-with-wi-fi.5.jpg"
  ],
  "name": "Motorola XOOM\u2122 with Wi-Fi",
  "sizeAndWeight": {
    "dimensions": [
      "249.1 mm (w)",
      "167.8 mm (h)",
      "12.9 mm (d)"
    ],
    "weight": "708.0 grams"
  },
  "storage": {
    "flash": "32000MB",
    "ram": "1000MB"
  }
};

class PhoneCatalogueBlockController {
  constructor(options) {
    this._el = options.element;

    this._phoneCatalogue = new ItemCatalogue({
      element: this._el.querySelector('[data-component="item-catalogue"]'),
      items: options.phones
    });

    this._phoneViewer = new ItemViewer({
      element: this._el.querySelector('[data-component="item-viewer"]'),
      submitButtonLabel: 'Add to basket'
    });


    this._phoneCatalogue.getElement().addEventListener('itemSelected', this._onCatalogueItemSelected.bind(this));
    this._phoneViewer.getElement().addEventListener('back', this._onBackFromPhoneViewer.bind(this));
  }

  _onCatalogueItemSelected(event) {
    let phoneId = event.detail;
    let phoneDetails = this._getPhoneDetails(phoneId);

    this._phoneCatalogue.hide();

    this._phoneViewer.render(phoneDetails);
    this._phoneViewer.show();
  }

  _onBackFromPhoneViewer() {
    this._phoneViewer.hide();
    this._phoneCatalogue.show();
  }

  _getPhoneDetails() {
    return phoneDetailsStub;
  }
}