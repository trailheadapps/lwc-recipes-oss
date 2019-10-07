import { LightningElement, api, track } from 'lwc';

export default class Input extends LightningElement {
    @api
    set checked(val) {
        this._checked = val;
    }
    get checked() {
        return this._checked;
    }
    @api disabled;
    @api label;
    @api max;
    @api min;
    @api name;
    @api type = 'text';
    @api
    set value(val) {
        this.valuePrivate = this._value = val !== undefined ? val : '';
    }
    get value() {
        return this._value;
    }

    @track valuePrivate = '';

    _checked = false;

    changeHandler(event) {
        this._value = this.calculateValue(event.target.value);
        this.dispatchEvent(new CustomEvent('change'));
    }

    changeCheckboxHandler() {
        this._checked = !this._checked;
        const checkboxEl = this.template.querySelector('div.checkbox span');
        if (this._checked) {
            checkboxEl.classList.add('checked');
        } else {
            checkboxEl.classList.remove('checked');
        }
        this.dispatchEvent(new CustomEvent('change'));
    }

    keyupHandler(event) {
        this._value = this.calculateValue(event.target.value);
        this.dispatchEvent(new CustomEvent('change'));
    }

    get isCheckboxField() {
        return this.type === 'checkbox';
    }

    get isNumberField() {
        return this.type === 'number';
    }

    get isSearchField() {
        return this.type === 'search';
    }

    get isTextField() {
        return this.type === 'text' || this.type === 'search';
    }

    calculateValue(value) {
        if (this.type !== 'number') {
            return value;
        }
        let newValue = Number(value);
        const max = Number(this.max);
        const min = Number(this.min);
        if (this.max && value > max) {
            newValue = max;
        } else if (this.min && value < min) {
            newValue = min;
        }
        return newValue;
    }
}
