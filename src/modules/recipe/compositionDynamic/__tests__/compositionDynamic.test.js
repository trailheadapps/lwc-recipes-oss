import { createElement } from 'lwc';
import CompositionDynamic from 'recipe/compositionDynamic';

describe('recipe-composition-dynamic', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    function flushPromises() {
        // eslint-disable-next-line no-undef
        return new Promise((resolve) => setImmediate(resolve));
    }

    it('renders nothing on page load', () => {
        // Create initial element
        const element = createElement('recipe-composition-dynamic', {
            is: CompositionDynamic
        });
        document.body.appendChild(element);

        // Select the Dynamic Element
        const dynamicEl = element.shadowRoot.querySelectorAll(
            'recipe-dynamic-import'
        );
        expect(dynamicEl.length).toBe(0);
    });

    it('renders the Hello component on button click', async () => {
        // Create initial element
        const element = createElement('recipe-composition-dynamic', {
            is: CompositionDynamic
        });
        document.body.appendChild(element);

        // Select contact tile for public property check
        const buttonEl = element.shadowRoot.querySelector('ui-button');
        buttonEl.click();

        return flushPromises().then(() => {
            const dynamicEl = element.shadowRoot.querySelectorAll(
                'recipe-dynamic-import'
            );
            expect(dynamicEl.length).toBe(1);
        });
    });
});
