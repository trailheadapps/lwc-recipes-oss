import { createElement, register } from 'lwc';
import { registerWireService } from '@lwc/wire-service';
import View from 'tetris/view';

registerWireService(register);

const app = createElement('tetris-view', { is: View });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
