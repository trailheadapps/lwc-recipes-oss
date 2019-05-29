import { LightningElement, track } from 'lwc';
import { findContacts } from 'data/simpleProvider';

/** The delay used when debouncing event handlers before a method call. */
const DELAY = 350;

export default class CompositionContactSearch extends LightningElement {
    @track contacts;
    @track error;

    handleKeyChange(event) {
        // Debouncing this method: Do not actually invoke the method call as long as this function is
        // being called within a delay of DELAY.
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            try {
                this.contacts = findContacts(searchKey);
            } catch (e) {
                this.error = e;
            }
        }, DELAY);
    }
}
