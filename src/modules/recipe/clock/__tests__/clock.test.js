import { createElement } from 'lwc';
import Clock from 'recipe/clock';

describe('recipe-clock', () => {
    it('sets current date/time after public function call', () => {
        // Create initial element
        const element = createElement('recipe-clock', {
            is: Clock
        });
        document.body.appendChild(element);

        // Query ui-output element
        const uiDateTimeEl = element.shadowRoot.querySelector('ui-output');
        const currentDateTimeVal = uiDateTimeEl.value;

        // Call public function on element
        element.refresh();

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Compare if tracked property has been assigned a new value.
            expect(uiDateTimeEl.value).not.toBe(currentDateTimeVal);
        });
    });
});
