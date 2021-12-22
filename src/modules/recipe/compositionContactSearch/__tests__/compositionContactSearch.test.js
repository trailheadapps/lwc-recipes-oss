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

        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing when calling imperative Apex.
    async function flushPromises() {
        return Promise.resolve();
    }

    // Helper function to wait for a duration.
    // This is used for accessibility tests where fake timers aren't supported.
    async function wait(duration) {
        return new Promise((resolve) => {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(() => resolve(), duration);
        });
    }

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

    it('renders one contact tile based on user input', async () => {
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

        // Run all fake timers.
        jest.runAllTimers();

        // Wait for any asynchronous DOM updates.
        await flushPromises();

        const contactTileEl = element.shadowRoot.querySelector(
            'recipe-contact-tile'
        );
        expect(contactTileEl).not.toBeNull();
        expect(contactTileEl.contact.Name).toBe(CONTACTS_SUCCESS[0].Name);
    });

    it('renders the error panel when the data provider returns an error', async () => {
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

        // Wait for any asynchronous DOM updates.
        await flushPromises();

        const contactTileEl = element.shadowRoot.querySelectorAll(
            'recipe-contact-tile'
        );
        expect(contactTileEl.length).toBe(0);
        const errorPanelEl =
            element.shadowRoot.querySelectorAll('recipe-error-panel');
        expect(errorPanelEl).not.toBeNull();
    });

    it('is accessible when data is returned', async () => {
        jest.useRealTimers();

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

        // Wait for component update
        await wait(400);

        await expect(element).toBeAccessible();
    });

    it('is accessible when error is returned', async () => {
        jest.useRealTimers();

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

        // Wait for component update
        await wait(400);

        await expect(element).toBeAccessible();
    });
});
