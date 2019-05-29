import { createElement } from 'lwc';
import ContactTile from 'recipe/contactTile';

const CONTACT_INPUT = {
    Id: '0031700000pJRRSAA4',
    Name: 'Amy Taylor',
    Title: 'VP of Engineering',
    Phone: '4152568563',
    Email: 'amy@demo.net',
    Picture: '/resources/images/demo/amy_taylor.jpg'
};

describe('recipe-contact-tile', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders picture, name, title, and phone number based on public property input', () => {
        // Create initial element
        const element = createElement('recipe-contact-tile', {
            is: ContactTile
        });
        // Set public property
        element.contact = CONTACT_INPUT;
        document.body.appendChild(element);

        // Select elements for validation
        const imgEl = element.shadowRoot.querySelector('img');
        expect(imgEl.src).toContain(CONTACT_INPUT.Picture);

        const detailEls = element.shadowRoot.querySelectorAll('p');
        expect(detailEls[0].textContent).toBe(CONTACT_INPUT.Name);
        expect(detailEls[1].textContent).toBe(CONTACT_INPUT.Title);

        const phoneEl = element.shadowRoot.querySelector('ui-output');
        expect(phoneEl.value).toBe(CONTACT_INPUT.Phone);
    });

    it('renders an informational message if public property is not set', () => {
        const MESSAGE = 'No contact data available.';

        // Create initial element
        const element = createElement('recipe-contact-tile', {
            is: ContactTile
        });
        document.body.appendChild(element);

        // Select element for validation
        const detailEl = element.shadowRoot.querySelector('p');
        expect(detailEl.textContent).toBe(MESSAGE);
    });
});
