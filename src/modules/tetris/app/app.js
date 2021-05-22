import { LightningElement, track } from 'lwc';
import { O, I, L, J, E, S, Z } from '../model/bricks';
import Engine from '../engine/engine';
import Canvas from '../../game/model/canvas';


export default class App extends LightningElement {
    // Note: the canvas (array) needs to be declared here, to fulfill all tracking requirements.
    @track canvas;
    engine;
    pixelScale = 20;
    
    constructor() {
        super();
        this.template.addEventListener('keydown', this.handleKeyPress.bind(this));
    }
    
    connectedCallback() {
        this.reset();
    }
    
    reset() {
        this.engine && this.engine.pause();
        
        this.canvas = new Canvas(10, 20);
        this.engine = new Engine(this.canvas);
    }
    
    handleClick({ detail: { x, y } }) {
        switch(this.template.querySelector('select').value) {
            case 'paint':
                this.canvas.paint(x, y, 'red');
                break;
            case 'brick':
                this.canvas.draw(x, y, L.shape, 'green');
                break;
            case 'start':
                this.engine.run();
                break;
            case 'reset':
                this.reset();
                break;
        }
    }
    
    handleKeyPress({ key }) {
        switch(key) {
            case ' ':
                this.engine.hardDrop();
                break;
            case 'ArrowRight':
                this.engine.move(1);
                break;
            case 'ArrowLeft':
                this.engine.move(-1);
                break;
            case 'ArrowUp':
                this.engine.rotate();
                break;
        }
    }
}