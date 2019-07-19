import { createElement } from 'lwc';
import EventWithdata from 'recipe/EventWithdata';
import { registerLdsTestWireAdapter } from '@salesforce/wire-service-jest-util';
import getContactList from 'data/wireGetContactListProvider';

const CONTACTS = [
    {
        Id: '0031700000pJRRSAA4',
        Name: 'Amy Taylor',
        Title: 'VP of Engineering',
        Phone: '4152568563',
        Email: 'amy@demo.net',
        Picture: '/resources/images/demo/amy_taylor.jpg'
    }
];

const getContactListWireAdapter = registerLdsTestWireAdapter(getContactList);

describe('recipe-event-with-data', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    it('renders contact list from wire', () => {
        // Create initial element
        const element = createElement('recipe-event-with-data', {
            is: EventWithdata
        });
        document.body.appendChild(element);

        // Send data to wire service
        getContactListWireAdapter.emit(CONTACTS);

        // Check rendered elements
        return Promise.resolve().then(() => {
            const contactElements = element.shadowRoot.querySelectorAll(
                'recipe-contact-list-item'
            );
            expect(contactElements.length).toBe(CONTACTS.length);
            expect(contactElements[0].contact.Name).toBe(CONTACTS[0].Name);
            expect(contactElements[0].contact.Title).toBe(CONTACTS[0].Title);
        });
    });

    it('renders error panel when wire fails', () => {
        // Create initial element
        const element = createElement('recipe-event-with-data', {
            is: EventWithdata
        });
        document.body.appendChild(element);

        // Send error to wire service
        getContactListWireAdapter.error();

        // Check rendered elements
        return Promise.resolve().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'recipe-error-panel'
            );
            expect(errorPanelEl).not.toBeNull();
        });
    });
});
