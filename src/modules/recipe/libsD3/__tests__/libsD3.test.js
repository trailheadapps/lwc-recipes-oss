import { createElement } from 'lwc';
import LibsD3 from 'recipe/libsD3';

describe('recipe-libs-d3', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Clear mocks so that every test run has a clean implementation
        jest.clearAllMocks();
    });

    it('contains a svg element for D3', () => {
        // Create initial element
        const element = createElement('recipe-libs-d3', {
            is: LibsD3
        });
        document.body.appendChild(element);

        // Querying the DOM element that has the lwc:dom directive set.
        const domEl = element.shadowRoot.querySelector('svg[class="d3"]');
        expect(domEl).not.toBeNull();
    });
});
