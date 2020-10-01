import { LightningElement } from 'lwc';

export default class CompositionDynamic extends LightningElement {
    componentConstructor;

    async loadComponent() {
        const ctor = await import('recipe/hello');
        this.componentConstructor = ctor.default;
    }
}
