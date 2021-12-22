import { contacts } from 'data/contacts';

export default class getContactList {
    connected = false;

    constructor(dataCallback) {
        this.dataCallback = dataCallback;
    }

    connect() {
        this.connected = true;
        this.provideContactList();
    }

    disconnect() {
        this.connected = false;
    }

    update() {
        this.provideContactList();
    }

    provideContactList() {
        if (this.connected) {
            this.dataCallback({ data: contacts });
        }
    }
}
