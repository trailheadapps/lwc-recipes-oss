import { createElement } from 'lwc';
import App from 'tetris/app';

document.querySelector('main')
        .appendChild(createElement('tetris-app', { is: App }));
