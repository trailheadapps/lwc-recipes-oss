import { createElement } from 'lwc';
import ExternalComponentNPM from 'recipe/externalComponentNpm';

/**
 * Third party wired components import is replaced by an empty stub in jest-mocks/wired-elements/wiredElements.js
 * as defined in jest.config.js so this test doesn't do much for now
 */
describe('recipe-external-component-npm', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('is accessible', () => {
        const element = createElement('recipe-external-component-npm', {
            is: ExternalComponentNPM
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
