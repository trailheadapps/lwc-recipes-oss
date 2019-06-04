import { LightningElement, api, track } from 'lwc';

export default class Select extends LightningElement {
    @api label;
    @api options;
    @api
    set value(val) {
        this.currentValue = val;
    }
    get value() {
        return this.currentValue;
    }

    @track currentValue;

    handleChange(event) {
        this.currentValue = this.options[event.target.selectedIndex].value;
        this.dispatchEvent(new CustomEvent('change'));
    }
}
