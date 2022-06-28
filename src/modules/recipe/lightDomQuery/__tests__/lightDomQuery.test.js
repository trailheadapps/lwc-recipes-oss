import { createElement } from 'lwc';
import LightDomQuery from 'recipe/lightDomQuery';

describe('recipe-light-dom-query', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('changes inner text in the recipe-light-dom-query-child paragraph element', () => {
        const BUTTON_LABEL = 'Change Text on Child';
        const PARAGRAPH_TEXT = 'Text changed by parent';

        const element = createElement('recipe-light-dom-query', {
            is: LightDomQuery
        });
        document.body.appendChild(element);

        const buttonEl = element.shadowRoot.querySelector('ui-button');
        buttonEl.click();

        expect(buttonEl.label).toBe(BUTTON_LABEL);

        //Verify light DOM child paragraph text is changed
        const pEl = element.shadowRoot.querySelector('p.lightDomParagraph');
        expect(pEl.innerText).toBe(PARAGRAPH_TEXT);
    });

    it('is accessible', async () => {
        const element = createElement('recipe-light-dom-query', {
            is: LightDomQuery
        });

        document.body.appendChild(element);

        //Verify component is accessible
        await expect(element).toBeAccessible();
    });
});
