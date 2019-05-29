import { createElement } from 'lwc';
import ChartBar from 'recipe/chartBar';

describe('recipe-chart-bar', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders a div with the percentage value as style attribute', () => {
        // Create initial element
        const element = createElement('recipe-chart-bar', {
            is: ChartBar
        });

        // Set public property
        element.percentage = 40;
        document.body.appendChild(element);

        // Query div for validating computed style attribute value on component init
        const divEl = element.shadowRoot.querySelector('div.bar');
        expect(divEl).not.toBeNull();
        expect(divEl.style._values.width).toBe('40%');

        // Set public property
        element.percentage = 60;

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Query div for validating computed style attribute value on public property change
            expect(divEl.style._values.width).toBe('60%');
        });
    });
});
