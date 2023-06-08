import { createElement } from 'lwc';
import ExternalComponentNPM from 'recipe/externalComponentNpm';

describe('recipe-external-component-npm', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays the third party component with relative time', () => {
        // Create element
        const element = createElement('recipe-external-component-npm', {
            is: ExternalComponentNPM
        });
        document.body.appendChild(element);

        const timeElement = element.shadowRoot.querySelector('relative-time');
        expect(timeElement.textContent).toBe('now');
    });

    it('is accessible', () => {
        const element = createElement('recipe-external-component-npm', {
            is: ExternalComponentNPM
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
