import { createElement } from 'lwc';
import CompositionContactSearch from 'recipe/compositionContactSearch';
import { findContacts } from 'data/simpleProvider';

// Mocking data provider call
jest.mock(
    'data/simpleProvider',
    () => {
        return {
            findContacts: jest.fn()
        };
    },
    { virtual: true }
);

// Sample data for data provider call
const CONTACTS_SUCCESS = [
    {
        Id: '0031700000pJRRSAA4',
        Name: 'Amy Taylor',
        Title: 'VP of Engineering',
        Phone: '4152568563',
        Email: 'amy@demo.net',
        Picture: '/resources/images/demo/amy_taylor.jpg'
    }
];

describe('recipe-composition-contact-search', () => {
    beforeAll(() => {
        // We use fake timers as setTimeout is used in the JavaScript file.
        jest.useFakeTimers();
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('does not render contact tiles by default', () => {
        // Create initial element
        const element = createElement('recipe-composition-contact-search', {
            is: CompositionContactSearch
        });
        document.body.appendChild(element);

        // Select rendered contact tile for length check
        const contactTileEls = element.shadowRoot.querySelectorAll(
            'recipe-contact-tile'
        );
        expect(contactTileEls.length).toBe(0);
    });

    it('renders one contact tile based on user input', () => {
        const USER_INPUT = 'Amy';

        // Assign mock value for returned data
        findContacts.mockReturnValue(CONTACTS_SUCCESS);

        // Create initial element
        const element = createElement('recipe-error-panel', {
            is: CompositionContactSearch
        });
        document.body.appendChild(element);

        // Simulate search
        const searchInput = element.shadowRoot.querySelector('ui-input');
        searchInput.value = USER_INPUT;
        searchInput.dispatchEvent(new CustomEvent('change'));

        // Disable search throttling
        jest.runAllTimers();

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            const contactTileEl = element.shadowRoot.querySelector(
                'recipe-contact-tile'
            );
            expect(contactTileEl).not.toBeNull();
            expect(contactTileEl.contact.Name).toBe(CONTACTS_SUCCESS[0].Name);
        });
    });

    it('renders the error panel when the data provider returns an error', () => {
        const USER_INPUT = 'invalid';

        // Throw error when trying to retrieve data
        findContacts.mockImplementation(() => {
            throw new Error();
        });

        // Create initial element
        const element = createElement('recipe-error-panel', {
            is: CompositionContactSearch
        });
        document.body.appendChild(element);

        // Simulate search
        const searchInput = element.shadowRoot.querySelector('ui-input');
        searchInput.value = USER_INPUT;
        searchInput.dispatchEvent(new CustomEvent('change'));

        // Disable search throttling
        jest.runAllTimers();

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            const contactTileEl = element.shadowRoot.querySelectorAll(
                'recipe-contact-tile'
            );
            expect(contactTileEl.length).toBe(0);
            const errorPanelEl = element.shadowRoot.querySelectorAll(
                'recipe-error-panel'
            );
            expect(errorPanelEl).not.toBeNull();
        });
    });
});
