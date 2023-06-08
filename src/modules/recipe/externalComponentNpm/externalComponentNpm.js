import { LightningElement } from 'lwc';
import 'time-elements';

export default class ExternalComponentNPM extends LightningElement {
    date;

    connectedCallback() {
        this.date = new Date();
    }
}
