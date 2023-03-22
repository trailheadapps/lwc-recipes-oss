import { createElement } from 'lwc';
import EventBubbling from 'recipe/eventBubbling';
import getContactList from 'data/wireGetContactListProvider';

// Realistic data with a list of records
const mockGetContactList = require('./data/getContactList.json');

// An empty list of records to verify the component does something reasonable
// when there is no data to display
const mockGetContactListNoRecords = require('./data/getContactListNoRecords.json');

describe('recipe-event-bubbling', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing when calling imperative Apex.
    async function flushPromises() {
        return Promise.resolve();
    }

    describe('getContactList @wire data', () => {
        it('renders two recipe-contact-list-item-bubbling elements', async () => {
            // Create initial element
            const element = createElement('recipe-event-bubbling', {
                is: EventBubbling
            });
            document.body.appendChild(element);

            // Emit data from @wire
            getContactList.emit({ data: mockGetContactList });

            // Wait for any asynchronous DOM updates
            await flushPromises();

            const contactListItemEls = element.shadowRoot.querySelectorAll(
                'recipe-contact-list-item-bubbling'
            );
            expect(contactListItemEls.length).toBe(mockGetContactList.length);
        });

        it('renders no recipe-contact-list-item-bubbling elements when no data', async () => {
            // Create initial element
            const element = createElement('recipe-event-bubbling', {
                is: EventBubbling
            });
            document.body.appendChild(element);

            // Emit data from @wire
            getContactList.emit({ data: mockGetContactListNoRecords });

            // Wait for any asynchronous DOM updates
            await flushPromises();

            // Select elements for validation
            const contactListItemEls = element.shadowRoot.querySelectorAll(
                'recipe-contact-list-item-bubbling'
            );
            expect(contactListItemEls.length).toBe(
                mockGetContactListNoRecords.length
            );
        });
    });

    describe('getContactList @wire error', () => {
        it('shows error panel element', async () => {
            // Create initial element
            const element = createElement('recipe-event-bubbling', {
                is: EventBubbling
            });
            document.body.appendChild(element);

            // Send error to wire service
            getContactList.emit({ error: 'an error' });

            // Wait for any asynchronous DOM updates
            await flushPromises();

            // Check rendered elements
            const errorPanelEl =
                element.shadowRoot.querySelector('recipe-error-panel');
            expect(errorPanelEl).not.toBeNull();
        });
    });

    it('shows selected contact data after bubbled event', async () => {
        const CONTACT = mockGetContactList[0];

        // Create initial element
        const element = createElement('recipe-event-bubbling', {
            is: EventBubbling
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getContactList.emit({ data: mockGetContactList });

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Select element for validation
        const contactListItemEls = element.shadowRoot.querySelectorAll(
            'recipe-contact-list-item-bubbling'
        );
        expect(contactListItemEls.length).toBe(mockGetContactList.length);
        // Dispatch event from child element to validate
        // behavior in current component.
        contactListItemEls[0].dispatchEvent(
            new CustomEvent('contactselect', {
                detail: CONTACT,
                bubbles: true
            })
        );

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Select element for validation
        const contactNameEl = element.shadowRoot.querySelector('p');
        expect(contactNameEl.textContent).toBe(CONTACT.Name);
    });

    it('is accessible when data is returned', async () => {
        // Create initial element
        const element = createElement('recipe-event-bubbling', {
            is: EventBubbling
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getContactList.emit({ data: mockGetContactList });

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });

    it('is accessible when error is returned', async () => {
        // Create initial element
        const element = createElement('recipe-event-bubbling', {
            is: EventBubbling
        });
        document.body.appendChild(element);

        // Emit error from @wire
        getContactList.emit({ error: 'an error' });

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });

    it('is accessible when a contact is selected', async () => {
        const CONTACT = {
            Id: '0031700000pJRRSAA4',
            Name: 'Amy Taylor',
            Title: 'VP of Engineering',
            Phone: '4152568563',
            Email: 'amy@demo.net',
            Picture__c:
                'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/amy_taylor.jpg'
        };

        // Create initial element
        const element = createElement('recipe-event-bubbling', {
            is: EventBubbling
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getContactList.emit({ data: mockGetContactList });

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Select element for validation
        const contactListItemEls = element.shadowRoot.querySelectorAll(
            'recipe-contact-list-item-bubbling'
        );
        expect(contactListItemEls.length).toBe(mockGetContactList.length);
        // Dispatch event from child element to validate
        // behavior in current component.
        contactListItemEls[0].dispatchEvent(
            new CustomEvent('contactselect', {
                detail: CONTACT,
                bubbles: true
            })
        );

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });
});
