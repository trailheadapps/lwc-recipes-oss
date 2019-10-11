import { createElement } from 'lwc';
import ApiProperty from 'recipe/apiProperty';

const PERCENTAGE_DEFAULT = 50;
const PERCENTAGE_CUSTOM = 40;
const PERCENTAGE_INVALID = 166;
const PERCENTAGE_MAX = 100;

describe('recipe-api-property', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders recipe-chart-bar component with a default percentage value', () => {
        // Create initial element
        const element = createElement('recipe-api-property', {
            is: ApiProperty
        });
        document.body.appendChild(element);

        // Query chart-bar component
        const chartBarEl = element.shadowRoot.querySelector('recipe-chart-bar');
        expect(chartBarEl).not.toBeNull();

        // Validation for default value passed down to child component
        expect(chartBarEl.percentage).toBe(PERCENTAGE_DEFAULT);
    });

    it('changes the value of the recipe-chart-bar child component based on user input', () => {
        // Create initial element
        const element = createElement('recipe-api-property', {
            is: ApiProperty
        });
        document.body.appendChild(element);

        // Select input field for simulating user input
        const uiInputEl = element.shadowRoot.querySelector('ui-input');
        uiInputEl.value = PERCENTAGE_CUSTOM;
        uiInputEl.dispatchEvent(new CustomEvent('change'));

        // Query chart-bar component
        const chartBarEl = element.shadowRoot.querySelector('recipe-chart-bar');

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Query newly set public property on chart-bar component
            expect(chartBarEl.percentage).toBe(PERCENTAGE_CUSTOM);
        });
    });

    it('does not render percentage greater than 100', () => {
        // Create initial element
        const element = createElement('recipe-api-property', {
            is: ApiProperty
        });
        document.body.appendChild(element);

        // Select input field for simulating user input
        const uiInputEl = element.shadowRoot.querySelector('ui-input');
        uiInputEl.value = PERCENTAGE_INVALID;
        uiInputEl.dispatchEvent(new CustomEvent('change'));

        // Query chart-bar component
        const chartBarEl = element.shadowRoot.querySelector('recipe-chart-bar');

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Query newly set public property on chart-bar component
            expect(chartBarEl.percentage).toBe(PERCENTAGE_MAX);
        });
    });
});
