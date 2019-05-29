import { LightningElement, api } from 'lwc';

export default class Navfooter extends LightningElement {
    @api labelNext;
    @api labelPrevious;
    @api urlNext;
    @api urlPrevious;
}
