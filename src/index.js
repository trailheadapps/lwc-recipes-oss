import { createElement } from 'lwc';
import UiApp from 'ui/app';

const app = createElement('ui-app', { is: UiApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
