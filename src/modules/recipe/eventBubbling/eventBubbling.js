import { LightningElement, wire, track } from 'lwc';
import getContactList from 'data/wireGetContactListProvider';

export default class EventBubbling extends LightningElement {
    @track selectedContact;

    @wire(getContactList) contacts;

    handleContactSelect(event) {
        this.selectedContact = event.target.contact;
    }
}
