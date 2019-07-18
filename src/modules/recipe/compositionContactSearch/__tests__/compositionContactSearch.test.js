import { createElement } from 'lwc';
import CompositionContactSearch from 'recipe/compositionContactSearch';
import * as simpleProviderDependency from 'data/simpleProvider';

const SEARCH_KEY = 'some search';
const SEARCH_RESULTS = [
    {
        Id: '0031700000pJRRSAA4',
        Name: 'Amy Taylor',
        Title: 'VP of Engineering',
        Phone: '4152568563',
        Email: 'amy@demo.net',
        Picture: '/resources/images/demo/amy_taylor.jpg'
    },
    {
        Id: '0031700000pJRRTAA4',
        Name: 'Michael Jones',
        Title: 'VP of Sales',
        Phone: '4158526633',
        Email: 'michael@demo.net',
        Picture: '/resources/images/demo/michael_jones.jpg'
    }
];

describe('recipe-composition-contact-search', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Clear mocks so that every test run has a clean implementation
        jest.clearAllMocks();
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

    it('calls simpleProvider.findContacts', () => {
        jest.useFakeTimers();

        // Mock simpleProvider.findContacts
        const findContactsMock = jest.fn();
        findContactsMock.mockReturnValue([]);
        simpleProviderDependency.findContacts = findContactsMock;

        // Create initial element
        const element = createElement('recipe-error-panel', {
            is: CompositionContactSearch
        });
        document.body.appendChild(element);

        // Simulate search
        const searchInput = element.shadowRoot.querySelector('ui-input');
        searchInput.value = SEARCH_KEY;
        searchInput.dispatchEvent(new CustomEvent('change'));

        // Disable search throttling
        jest.runAllTimers();

        expect(findContactsMock).toHaveBeenCalledWith(SEARCH_KEY);
    });

    it('displays search results', () => {
        jest.useFakeTimers();

        // Mock simpleProvider.findContacts
        const findContactsMock = jest.fn();
        findContactsMock.mockReturnValue(SEARCH_RESULTS);
        simpleProviderDependency.findContacts = findContactsMock;

        // Create initial element
        const element = createElement('recipe-error-panel', {
            is: CompositionContactSearch
        });
        document.body.appendChild(element);

        // Simulate search
        const searchInput = element.shadowRoot.querySelector('ui-input');
        searchInput.value = SEARCH_KEY;
        searchInput.dispatchEvent(new CustomEvent('change'));

        // Disable search throttling
        jest.runAllTimers();

        // Check that data was queried
        expect(findContactsMock).toHaveBeenCalledWith(SEARCH_KEY);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            const contactTileEl = element.shadowRoot.querySelectorAll(
                'recipe-contact-tile'
            );
            expect(contactTileEl.length).toBe(SEARCH_RESULTS.length);
            expect(contactTileEl[0].contact.Name).toBe(SEARCH_RESULTS[0].Name);
            expect(contactTileEl[1].contact.Name).toBe(SEARCH_RESULTS[1].Name);
        });
    });

    it('displays search errors', () => {
        jest.useFakeTimers();

        // Mock simpleProvider.findContacts
        const findContactsMock = jest.fn();
        findContactsMock.mockImplementation(() => {
            throw new Error();
        });
        simpleProviderDependency.findContacts = findContactsMock;

        // Create initial element
        const element = createElement('recipe-error-panel', {
            is: CompositionContactSearch
        });
        document.body.appendChild(element);

        // Simulate search
        const searchInput = element.shadowRoot.querySelector('ui-input');
        searchInput.value = SEARCH_KEY;
        searchInput.dispatchEvent(new CustomEvent('change'));

        // Disable search throttling
        jest.runAllTimers();

        // Check rendered DOM
        return Promise.resolve().then(() => {
            const contactTileEl = element.shadowRoot.querySelectorAll(
                'recipe-contact-tile'
            );
            expect(contactTileEl.length).toBe(0);
            const errorPanelEl = element.shadowRoot.querySelectorAll(
                'recipe-error-panel'
            );
            expect(errorPanelEl.length).toBe(1);
        });
    });
});
