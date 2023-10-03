import { LightningElement } from 'lwc';
import 'wired-elements';

export default class ExternalComponentNPM extends LightningElement {
    greeting = 'World';

    handleChange(event) {
        this.greeting = event.target.value;
    }

    handleSayHelloClick() {
        // eslint-disable-next-line no-alert
        alert(`Hello ${this.greeting}`);
    }
}
