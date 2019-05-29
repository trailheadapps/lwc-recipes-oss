import { createElement, register } from 'lwc';
import { registerWireService } from '@lwc/wire-service';
import App from 'ui/app';

registerWireService(register);
const app = createElement('ui-app', {
    is: App
});
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
