import { LightningElement, api } from 'lwc';

export default class Clock extends LightningElement {
    @api
    refresh() {
        this.timestamp = new Date().toISOString();
    }

    timestamp = new Date().toISOString();
}
