import { LightningElement, api } from 'lwc';

export default class Card extends LightningElement {
    @api imageUrl;
    @api title;
    @api subtitle;

    get showHeader() {
        return this.title && this.subtitle;
    }

    get showImage() {
        return this.imageUrl !== undefined && this.imageUrl.length > 0;
    }
}
