import { createElement } from 'lwc';
import ExternalComponentCDN from 'recipe/externalComponentCdn';

describe('recipe-external-component-cdn', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('is accessible', () => {
        const element = createElement('recipe-external-component-cdn', {
            is: ExternalComponentCDN
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
