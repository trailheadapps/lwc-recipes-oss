import { LightningElement } from 'lwc';

export default class ExternalComponentCDN extends LightningElement {
    rating = 3;
    rendered = false;

    renderedCallback() {
        if (this.rendered) {
            return;
        }
        this.rendered = true;

        /**
         * LWC's declarative event bindings only support lowercase events.
         * Events using anything other than lowercase can be listened for using the imperative addEventListener() API.
         * https://rfcs.lwc.dev/rfcs/lwc/0118-native-web-components-support#events
         */
        this.template
            .querySelector('sl-rating')
            .addEventListener('sl-change', (event) => {
                this.rating = event.target.value;
            });
    }
}
