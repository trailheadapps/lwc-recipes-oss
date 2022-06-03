import { createElement } from 'lwc';
import LightDomQueryChild from 'recipe/lightDomQueryChild';

describe('recipe-light-dom-query-child', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('changes inner text in the paragraph element', () => {
        const BUTTON_LABEL = 'Change Text';
        const PARAGRAPH_TEXT = 'Text changed by child';

        const element = createElement('recipe-light-dom-query-child', {
            is: LightDomQueryChild
        });
        document.body.appendChild(element);

        const buttonEl = element.querySelector('ui-button');
        buttonEl.click();

        //Verify the 'Change Text' button is clicked
        expect(buttonEl.label).toBe(BUTTON_LABEL);

        //Verify light DOM paragraph text is changed
        const pEl = element.querySelector('p.lightDomParagraph');
        expect(pEl.innerText).toBe(PARAGRAPH_TEXT);
    });

    it('is accessible', async () => {
        const element = createElement('recipe-light-dom-query-child', {
            is: LightDomQueryChild
        });

        document.body.appendChild(element);

        //Verify component is accessible
        await expect(element).toBeAccessible();
    });
});
