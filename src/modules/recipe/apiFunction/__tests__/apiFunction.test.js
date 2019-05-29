import { createElement } from 'lwc';
import ApiFunction from 'recipe/apiFunction';

describe('recipe-api-function', () => {
    it('calls the public function "refresh" on the recipe-clock component', () => {
        // Create initial element
        const element = createElement('recipe-api-function', {
            is: ApiFunction
        });
        document.body.appendChild(element);

        // Query ui-button component element
        const clockEl = element.shadowRoot.querySelector('recipe-clock');
        clockEl.refresh = jest.fn();

        // Query ui-button element
        const buttonEl = element.shadowRoot.querySelector('ui-button');
        buttonEl.click();

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Compare if public function has been called
            expect(clockEl.refresh).toHaveBeenCalled();
        });
    });
});
