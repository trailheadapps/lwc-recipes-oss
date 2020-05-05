import { LightningElement, api } from 'lwc';

export default class Card extends LightningElement {
    @api imageUrl;
    @api title;
    @api subtitle;
}
