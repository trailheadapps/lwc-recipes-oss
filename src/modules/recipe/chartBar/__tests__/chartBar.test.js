import { createElement } from 'lwc';
import ChartBar from 'recipe/chartBar';

describe('recipe-chart-bar', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders a div with the percentage value as style attribute', async () => {
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
        expect(divEl.style.width).toBe('40%');

        // Set public property
        element.percentage = 60;

        // Wait for any asynchronous DOM updates.
        await Promise.resolve();

        // Query div for validating computed style attribute value on public property change
        expect(divEl.style.width).toBe('60%');
    });

    it('is accessible', async () => {
        const element = createElement('recipe-chart-bar', {
            is: ChartBar
        });

        element.percentage = 40;
        document.body.appendChild(element);

        await Promise.resolve();
        expect(element).toBeAccessible();
    });
});
