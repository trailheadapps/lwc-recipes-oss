import { createElement } from 'lwc';
import EventBubbling from 'recipe/eventBubbling';
import { registerLdsTestWireAdapter } from '@salesforce/wire-service-jest-util';
import getContactList from 'data/wireGetContactListProvider';

// Realistic data with a list of records
const mockGetContactList = require('./data/getContactList.json');

// An empty list of records to verify the component does something reasonable
// when there is no data to display
const mockGetContactListNoRecords = require('./data/getContactListNoRecords.json');

// Register as data service wire adapter. Some tests verify that provisioned values trigger desired behavior.
const getContactListAdapter = registerLdsTestWireAdapter(getContactList);

describe('recipe-event-bubbling', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    describe('getContactList @wire data', () => {
        it('renders two recipe-contact-list-item-bubbling elements', () => {
            // Create initial element
            const element = createElement('recipe-event-bubbling', {
                is: EventBubbling
            });
            document.body.appendChild(element);

            // Emit data from @wire
            getContactListAdapter.emit(mockGetContactList);

            // Check rendered elements
            return Promise.resolve().then(() => {
                const contactListItemEls = element.shadowRoot.querySelectorAll(
                    'recipe-contact-list-item-bubbling'
                );
                expect(contactListItemEls.length).toBe(
                    mockGetContactList.length
                );
            });
        });

        it('renders no recipe-contact-list-item-bubbling elements when no data', () => {
            // Create initial element
            const element = createElement('recipe-event-bubbling', {
                is: EventBubbling
            });
            document.body.appendChild(element);

            // Emit data from @wire
            getContactListAdapter.emit(mockGetContactListNoRecords);

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                // Select elements for validation
                const contactListItemEls = element.shadowRoot.querySelectorAll(
                    'recipe-contact-list-item-bubbling'
                );
                expect(contactListItemEls.length).toBe(
                    mockGetContactListNoRecords.length
                );
            });
        });
    });

    describe('getContactList @wire error', () => {
        it('shows error panel element', () => {
            // Create initial element
            const element = createElement('recipe-event-bubbling', {
                is: EventBubbling
            });
            document.body.appendChild(element);

            // Send error to wire service
            getContactListAdapter.error();

            // Check rendered elements
            return Promise.resolve().then(() => {
                const errorPanelEl = element.shadowRoot.querySelector(
                    'recipe-error-panel'
                );
                expect(errorPanelEl).not.toBeNull();
            });
        });
    });

    it('shows selected contact data after bubbled event', () => {
        const CONTACT = mockGetContactList[0];

        // Create initial element
        const element = createElement('recipe-event-bubbling', {
            is: EventBubbling
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getContactListAdapter.emit(mockGetContactList);

        return Promise.resolve()
            .then(() => {
                // Select element for validation
                const contactListItemEls = element.shadowRoot.querySelectorAll(
                    'recipe-contact-list-item-bubbling'
                );
                expect(contactListItemEls.length).toBe(
                    mockGetContactList.length
                );
                // Dispatch event from child element to validate
                // behavior in current component.
                contactListItemEls[0].dispatchEvent(
                    new CustomEvent('contactselect', {
                        detail: CONTACT,
                        bubbles: true
                    })
                );
            })
            .then(() => {
                // Select element for validation
                const contactNameEl = element.shadowRoot.querySelector('p');
                expect(contactNameEl.textContent).toBe(CONTACT.Name);
            });
    });
});
