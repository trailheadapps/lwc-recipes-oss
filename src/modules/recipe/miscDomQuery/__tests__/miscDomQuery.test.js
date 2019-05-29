import { createElement } from 'lwc';
import MiscDomQuery from 'recipe/miscDomQuery';

describe('recipe-misc-dom-query', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders ui-input checkbox fields unchecked', () => {
        // Create initial element
        const element = createElement('recipe-misc-dom-query', {
            is: MiscDomQuery
        });
        document.body.appendChild(element);

        // Query all ui-input fields
        const uiInputCheckedEls = element.shadowRoot.querySelectorAll(
            'ui-input'
        );
        uiInputCheckedEls.forEach(input => {
            expect(input.checked).toBeFalsy();
        });
    });

    it('displays labels of checked ui-input fields as checked items', () => {
        // Create initial element
        const element = createElement('recipe-misc-dom-query', {
            is: MiscDomQuery
        });
        document.body.appendChild(element);

        // Query all ui-input fields
        const uiInputEls = element.shadowRoot.querySelectorAll('ui-input');
        uiInputEls[0].checked = true;
        uiInputEls[0].dispatchEvent(new CustomEvent('change'));

        // Query p element
        const pEl = element.shadowRoot.querySelector('p');

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise ends in the
        // rejected state
        return Promise.resolve()
            .then(() => {
                // Check if output text got newly rendered based on checked category ui-input field
                expect(pEl.textContent).toBe('Checked items: Category 1');

                uiInputEls[1].checked = true;
                uiInputEls[1].dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                // Check if output text got newly rendered based on checked category ui-input field
                expect(pEl.textContent).toBe(
                    'Checked items: Category 1, Category 2'
                );

                uiInputEls[2].checked = true;
                uiInputEls[2].dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                // Check if output text got newly rendered based on checked category ui-input field
                expect(pEl.textContent).toBe(
                    'Checked items: Category 1, Category 2, Category 3'
                );
            });
    });
});
