import { LightningElement, api, track } from 'lwc';

export default class Clock extends LightningElement {
    @api
    refresh() {
        this.timestamp = new Date().toISOString();
    }

    @track timestamp = new Date().toISOString();
}
