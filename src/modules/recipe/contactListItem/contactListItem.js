import { LightningElement, api } from 'lwc';

export default class ContactListItem extends LightningElement {
    @api contact;

    handleClick(event) {
        // 1. Prevent default behavior of anchor tag click which is to navigate to the href url
        event.preventDefault();
        // 2. Read about event best practices at http://lwc.dev/guide/events#pass-data-in-events
        const selectEvent = new CustomEvent('select', {
            detail: this.contact.Id
        });
        // 3. Fire the custom event
        this.dispatchEvent(selectEvent);
    }
}
