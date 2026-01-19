import { createElement } from 'lwc';
import EventWithData from 'recipe/eventWithData';
import getContactList from 'data/wireGetContactListProvider';
import mockGetContactList from './data/getContactList.json';
import mockGetContactListNoRecords from './data/getContactListNoRecords.json';

describe('recipe-event-with-data', () => {
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
        it('renders multiple recipe-contact-list-item elements', async () => {
            // Create initial element
            const element = createElement('recipe-event-with-data', {
                is: EventWithData
            });
            document.body.appendChild(element);

            // Send data to wire service
            getContactList.emit({ data: mockGetContactList });

            // Wait for any asynchronous DOM updates
            await flushPromises();

            const contactListItemEls = element.shadowRoot.querySelectorAll(
                'recipe-contact-list-item'
            );
            expect(contactListItemEls.length).toBe(mockGetContactList.length);
        });

        it('renders no recipe-contact-list-item-bubbling elements when no data', async () => {
            // Create initial element
            const element = createElement('recipe-event-with-data', {
                is: EventWithData
            });
            document.body.appendChild(element);

            // Emit data from @wire
            getContactList.emit({ data: mockGetContactListNoRecords });

            // Wait for any asynchronous DOM updates
            await flushPromises();

            // Select elements for validation
            const contactListItemEls = element.shadowRoot.querySelectorAll(
                'recipe-contact-list-item'
            );
            expect(contactListItemEls.length).toBe(
                mockGetContactListNoRecords.length
            );
        });
    });

    describe('getContactList @wire error', () => {
        it('shows error panel element', async () => {
            // Create initial element
            const element = createElement('recipe-event-with-data', {
                is: EventWithData
            });
            document.body.appendChild(element);

            // Emit error from @wire
            getContactList.emit({ error: 'an error' });

            // Wait for any asynchronous DOM updates
            await flushPromises();

            const errorPanelEl =
                element.shadowRoot.querySelector('recipe-error-panel');
            expect(errorPanelEl).not.toBeNull();
        });
    });

    it('shows selected contact data after event', async () => {
        // Create initial element
        const element = createElement('recipe-event-with-data', {
            is: EventWithData
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getContactList.emit({ data: mockGetContactList });

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Select element for validation
        const contactListItemEls = element.shadowRoot.querySelectorAll(
            'recipe-contact-list-item'
        );
        expect(contactListItemEls.length).toBe(mockGetContactList.length);
        // Dispatch event from child element to validate
        // behavior in current component.
        contactListItemEls[0].dispatchEvent(
            new CustomEvent('select', {
                detail: mockGetContactList[0].Id
            })
        );

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Select element for validation
        const contactNameEl = element.shadowRoot.querySelector('p');
        expect(contactNameEl.textContent).toBe(mockGetContactList[0].Name);
    });

    it('is accessible when data is returned', async () => {
        // Create initial element
        const element = createElement('recipe-event-with-data', {
            is: EventWithData
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
        const element = createElement('recipe-event-with-data', {
            is: EventWithData
        });
        document.body.appendChild(element);

        // Emit error from @wire
        getContactList.emit({ error: 'an error' });

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });

    it('is accessible when contact is selected', async () => {
        // Create initial element
        const element = createElement('recipe-event-with-data', {
            is: EventWithData
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getContactList.emit({ data: mockGetContactList });

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Select element for validation
        const contactListItemEls = element.shadowRoot.querySelectorAll(
            'recipe-contact-list-item'
        );
        expect(contactListItemEls.length).toBe(mockGetContactList.length);
        // Dispatch event from child element to validate
        // behavior in current component.
        contactListItemEls[0].dispatchEvent(
            new CustomEvent('select', {
                detail: mockGetContactList[0].Id
            })
        );

        await expect(element).toBeAccessible();
    });
});
