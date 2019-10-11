import { createElement, register } from 'lwc';
import { registerWireService } from '@lwc/wire-service';
import UiApp from 'ui/app';

registerWireService(register);

const app = createElement('my-app', { is: UiApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
