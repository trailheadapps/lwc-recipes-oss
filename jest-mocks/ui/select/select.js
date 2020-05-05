import { LightningElement, api } from 'lwc';

export default class Select extends LightningElement {
    @api label;
    @api options;
    @api value;
}
