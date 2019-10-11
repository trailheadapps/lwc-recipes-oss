import { createElement } from 'lwc';
import EventWithData from 'recipe/eventWithData';
import { registerLdsTestWireAdapter } from '@salesforce/wire-service-jest-util';
import getContactList from 'data/wireGetContactListProvider';

// Realistic data with a list of records
const mockGetContactList = require('./data/getContactList.json');

// An empty list of records to verify the component does something reasonable
// when there is no data to display
const mockGetContactListNoRecords = require('./data/getContactListNoRecords.json');

// Register as data prodider wire adapter. Some tests verify that provisioned values trigger desired behavior.
const getContactListAdapter = registerLdsTestWireAdapter(getContactList);

describe('recipe-event-with-data', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    describe('getContactList @wire data', () => {
        it('renders two crecipe-contact-list-item elements', () => {
            // Create initial element
            const element = createElement('recipe-event-with-data', {
                is: EventWithData
            });
            document.body.appendChild(element);

            // Send data to wire service
            getContactListAdapter.emit(mockGetContactList);

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                const contactListItemEls = element.shadowRoot.querySelectorAll(
                    'recipe-contact-list-item'
                );
                expect(contactListItemEls.length).toBe(
                    mockGetContactList.length
                );
            });
        });

        it('renders no recipe-contact-list-item-bubbling elements when no data', () => {
            // Create initial element
            const element = createElement('recipe-event-with-data', {
                is: EventWithData
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
                    'recipe-contact-list-item'
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
            const element = createElement('recipe-event-with-data', {
                is: EventWithData
            });
            document.body.appendChild(element);

            // Emit error from @wire
            getContactListAdapter.error();

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                const errorPanelEl = element.shadowRoot.querySelector(
                    'recipe-error-panel'
                );
                expect(errorPanelEl).not.toBeNull();
            });
        });
    });

    it('shows selected contact data after event', () => {
        // Create initial element
        const element = createElement('recipe-event-with-data', {
            is: EventWithData
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getContactListAdapter.emit(mockGetContactList);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve()
            .then(() => {
                // Select element for validation
                const contactListItemEls = element.shadowRoot.querySelectorAll(
                    'recipe-contact-list-item'
                );
                expect(contactListItemEls.length).toBe(
                    mockGetContactList.length
                );
                // Dispatch event from child element to validate
                // behavior in current component.
                contactListItemEls[0].dispatchEvent(
                    new CustomEvent('select', {
                        detail: mockGetContactList[0].Id
                    })
                );
            })
            .then(() => {
                // Select element for validation
                const contactNameEl = element.shadowRoot.querySelector('p');
                expect(contactNameEl.textContent).toBe(
                    mockGetContactList[0].Name
                );
            });
    });
});
