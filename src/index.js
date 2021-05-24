import { createElement } from 'lwc';
import Tetris from 'arcade/tetris';

document.querySelector('main')
        .appendChild(createElement('arcade-tetris', { is: Tetris }));
