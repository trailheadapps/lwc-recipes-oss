import { createElement } from 'lwc';
import ContactListItem from 'recipe/contactListItem';

describe('recipe-contact-list-item', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('shows contact name and image based on public property', () => {
        const CONTACT = {
            Id: '0031700000pJRRSAA4',
            Name: 'Amy Taylor',
            Title: 'VP of Engineering',
            Phone: '4152568563',
            Email: 'amy@demo.net',
            Picture: '/resources/images/demo/amy_taylor.jpg'
        };

        // Create initial element
        const element = createElement('recipe-contact-list-item', {
            is: ContactListItem
        });
        // Set public property
        element.contact = CONTACT;
        document.body.appendChild(element);

        // Select elements for validation
        const imgEl = element.shadowRoot.querySelector('img');
        expect(imgEl.src).toContain(CONTACT.Picture);
        const nameEl = element.shadowRoot.querySelector('p');
        expect(nameEl.textContent).toBe(CONTACT.Name);
    });
});
