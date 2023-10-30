import { createElement } from 'lwc';
import ApiSpread from 'recipe/apiSpread';

describe('recipe-api-spread', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // Helper function to wait until the microtask queue is empty.
    async function flushPromises() {
        return Promise.resolve();
    }

    // Helper function to set values in the ui-input elements
    function setInputElementValues(element, firstName, lastName) {
        element.shadowRoot.querySelectorAll('ui-input').forEach((input) => {
            if (firstName && input.name === 'firstName') {
                input.value = firstName;
                input.dispatchEvent(new CustomEvent('change'));
            } else if (lastName && input.name === 'lastName') {
                input.value = lastName;
                input.dispatchEvent(new CustomEvent('change'));
            }
        });
    }

    it('renders recipe-child component with default values', () => {
        // Create component
        const element = createElement('recipe-api-spread', {
            is: ApiSpread
        });
        document.body.appendChild(element);

        // Query child component
        const childEl = element.shadowRoot.querySelector('recipe-child');
        expect(childEl).not.toBeNull();

        // Validation for default values passed down to child component
        expect(childEl.firstName).toBe('Amy');
        expect(childEl.lastName).toBe('Taylor');
    });

    it('changes the value of the recipe-child component based on user input', async () => {
        // Create component
        const element = createElement('recipe-api-spread', {
            is: ApiSpread
        });
        document.body.appendChild(element);

        // Set values in the ui-input elements
        setInputElementValues(element, 'Jennifer', 'Wu');

        // Query child component
        const childEl = element.shadowRoot.querySelector('recipe-child');
        expect(childEl).not.toBeNull();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Validation for values of lwc spread properties passed down to child component
        expect(childEl.firstName).toBe('Jennifer');
        expect(childEl.lastName).toBe('Wu');
    });

    it('is accessible', async () => {
        // Create component
        const element = createElement('recipe-api-spread', {
            is: ApiSpread
        });
        document.body.appendChild(element);

        // Check accessibility
        await expect(element).toBeAccessible();
    });
});
