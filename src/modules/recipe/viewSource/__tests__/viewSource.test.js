import { createElement } from 'lwc';
import ViewSource from 'recipe/viewSource';

describe('recipe-view-source', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders an a href that points to the LWC Recipes OSS GitHub repo', () => {
        const BASE_URL =
            'https://github.com/trailheadapps/lwc-recipes-oss/tree/master/src/modules/';
        const LWC_PARAMETER = 'superLwc';
        const RESULT = BASE_URL + LWC_PARAMETER;

        // Create initial element
        const element = createElement('recipe-contact-list', {
            is: ViewSource
        });
        // Set public properties
        element.source = LWC_PARAMETER;
        document.body.appendChild(element);

        // Select element for validation
        const linkEl = element.shadowRoot.querySelector('a');
        expect(linkEl.href).toBe(RESULT);
    });
});
