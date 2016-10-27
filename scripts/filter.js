'use strict';

class Filter extends Component {
  constructor(options) {
    super(options.element);

    this._fieldElement = this._el.querySelector('[data-element="field"]');

    this._fieldElement.oninput = this._onFieldValueChange.bind(this);
  }

  _onFieldValueChange(event) {
    this._triggerFilterChangeEvent();
  }

  _triggerFilterChangeEvent() {
    let event = new CustomEvent('filter.change', {
      detail: this._fieldElement.value
    });

    this._el.dispatchEvent(event);
  }
}