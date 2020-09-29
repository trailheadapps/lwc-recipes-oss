import { createElement } from 'lwc';
import MiscMultipleTemplates from 'recipe/miscMultipleTemplates';

// Text constants to test text content
const TEMPLATE1_TEXT_CONTENT = 'Template One';
const TEMPLATE2_TEXT_CONTENT = 'Template Two';

describe('recipe-misc-multiple-templates', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays templateOne on initial render', () => {
        // Create initial element
        const element = createElement('recipe-misc-multiple-templates', {
            is: MiscMultipleTemplates
        });
        document.body.appendChild(element);

        // On initial render templateOne should be displayed
        // Retrieve and verify text element from DOM
        const pEl = element.shadowRoot.querySelector('div');
        expect(pEl.textContent).toBe(TEMPLATE1_TEXT_CONTENT);
    });

    it('displays templateTwo on click', () => {
        // Create initial element
        const element = createElement('recipe-misc-multiple-templates', {
            is: MiscMultipleTemplates
        });
        document.body.appendChild(element);

        // Simulate user click
        const button = element.shadowRoot.querySelector('ui-button');
        button.click();

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Once click invoked, templateTwo should be in place.

            // Retrieve and verify text element from DOM
            const pEl = element.shadowRoot.querySelector('div');
            expect(pEl.textContent).toBe(TEMPLATE2_TEXT_CONTENT);
        });
    });

    it('displays templateOne after two clicks', () => {
        // Create initial element
        const element = createElement('recipe-misc-multiple-templates', {
            is: MiscMultipleTemplates
        });
        document.body.appendChild(element);

        // Simulate two user clicks
        const button = element.shadowRoot.querySelector('ui-button');
        button.click();
        button.click();

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Once two clicks invoked, templateOne should be in place.

            // Retrieve and verify text element from DOM
            const pEl = element.shadowRoot.querySelector('div');
            expect(pEl.textContent).toBe(TEMPLATE1_TEXT_CONTENT);
        });
    });

    it('is accessible when template1 is shown', () => {
        const element = createElement('recipe-misc-multiple-templates', {
            is: MiscMultipleTemplates
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });

    it('is accessible when template2 is shown', () => {
        const element = createElement('recipe-misc-multiple-templates', {
            is: MiscMultipleTemplates
        });

        document.body.appendChild(element);

        // Simulate user click
        const button = element.shadowRoot.querySelector('ui-button');
        button.click();

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
