import { LightningElement, api, track } from 'lwc';

export default class Clock extends LightningElement {
    @api
    refresh() {
        this.timestamp = new Date().toISOString();
        console.log(this.timestamp);
    }

    @track timestamp = new Date().toISOString();
}
