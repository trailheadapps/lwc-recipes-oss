import { createElement } from 'lwc';
import EventSimple from 'recipe/eventSimple';

describe('recipe-event-simple', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('increments and decrements the page value by 1 on button click', () => {
        // Create initial element
        const element = createElement('recipe-event-simple', {
            is: EventSimple
        });
        document.body.appendChild(element);

        const paginatorEl = element.shadowRoot.querySelector(
            'recipe-paginator'
        );

        // Send event to increment page number
        paginatorEl.dispatchEvent(new CustomEvent('next'));

        const pageEl = element.shadowRoot.querySelector('p');

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve()
            .then(() => {
                // Verify that property is correctly incremented.
                expect(pageEl.textContent).toBe('Page 2');

                // Send event to decrement page number
                paginatorEl.dispatchEvent(new CustomEvent('previous'));
            })
            .then(() => {
                // Verify that property is correctly incremented.
                expect(pageEl.textContent).toBe('Page 1');

                // Decrement again
                paginatorEl.dispatchEvent(new CustomEvent('previous'));
            })
            .then(() => {
                // Verify that property is not decremented, and the initial value stays on 1.
                expect(pageEl.textContent).toBe('Page 1');
            });
    });

    it('is accessible', () => {
        const element = createElement('recipe-event-simple', {
            is: EventSimple
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
