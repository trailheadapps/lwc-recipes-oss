import { LightningElement, api } from 'lwc';

export default class Select extends LightningElement {
    @api label;
    @api options;
    @api value;

    handleChange(event) {
        const val = this.options[event.target.selectedIndex].value;
        console.log(val);
        this.dispatchEvent(new CustomEvent('change'), {
            detail: val
        });
    }
}
