import { createElement } from 'lwc';
import LightDomHello from 'recipe/lightDomHello';

describe('recipe-light-dom-hello', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays greeting in light DOM', () => {
        const element = createElement('recipe-light-dom-hello', {
            is: LightDomHello
        });
        document.body.appendChild(element);

        // Verify displayed greeting
        const divEl = element.querySelector('div');
        expect(divEl.textContent).toBe('Hello from Light DOM!');
    });

    it('is accessible', async () => {
        const element = createElement('recipe-light-dom-hello', {
            is: LightDomHello
        });

        document.body.appendChild(element);

        //Verify component is accessible
        await expect(element).toBeAccessible();
    });
});
