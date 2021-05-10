import { createElement } from 'lwc';
import LibsChartjs from 'recipe/libsChartjs';
import ResizeObserver from './resizeObserverMock.js';

describe('recipe-libs-chartjs', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('contains a canvas element for ChartJs', () => {
        // Create initial element
        const element = createElement('recipe-libs-chartjs', {
            is: LibsChartjs
        });
        const ro = new ResizeObserver();
        ro.observe(document.body);
        document.body.appendChild(element);

        // Querying the DOM element that has the lwc:dom directive set.
        const domEl = element.shadowRoot.querySelector('canvas.donut');
        expect(domEl).not.toBeNull();
    });
});
