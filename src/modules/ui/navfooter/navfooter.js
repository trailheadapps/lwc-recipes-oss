import { LightningElement, api } from 'lwc';

export default class Navfooter extends LightningElement {
    @api labelNext;
    @api labelPrevious;

    handleNextClick(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('nextclicked'));
    }

    handlePreviousClick(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('previousclicked'));
    }
}
