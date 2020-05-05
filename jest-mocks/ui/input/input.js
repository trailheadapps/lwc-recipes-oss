import { LightningElement, api } from 'lwc';

export default class Input extends LightningElement {
    @api checked;
    @api disabled;
    @api label;
    @api max;
    @api min;
    @api name;
    @api type = 'text';
    @api value;
}
