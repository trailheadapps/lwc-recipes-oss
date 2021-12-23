import { createElement } from 'lwc';
import UiApp from 'ui/app';

const app = createElement('my-app', { is: UiApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
