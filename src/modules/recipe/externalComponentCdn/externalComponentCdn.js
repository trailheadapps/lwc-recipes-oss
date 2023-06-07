import { LightningElement } from 'lwc';

export default class ExternalComponentCDN extends LightningElement {
    rating = 3;
    rendered = false;

    renderedCallback() {
        if (this.rendered) {
            return;
        }
        this.rendered = true;

        this.template
            .querySelector('sl-rating')
            .addEventListener('sl-change', (event) => {
                this.rating = event.target.value;
            });
    }
}
