import { LightningElement } from 'lwc';

export default class Hello extends LightningElement {
    greeting = 'World';

    _isRendered = false;

    connectedCallback() {
        this.doSomeStuff();
    }

    async doSomeStuff() {
        const errorPanel = await import(
            /* webpackChunkName: "errorPanel" */ 'recipe/errorPanel'
        );
        // eslint-disable-next-line no-console
        console.log(errorPanel);
    }
}
