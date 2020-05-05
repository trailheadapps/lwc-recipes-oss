import { LightningElement, api } from 'lwc';

export default class Output extends LightningElement {
    @api currencyCode;
    @api dateType;
    @api label;
    @api type = 'text';

    @api value;
}
