import { LightningElement, track } from 'lwc';
import Engine from '../engine/engine';
import Canvas from '../../view/model/canvas';

export default class App extends LightningElement {
    // Note: the canvas (array) needs to be declared here, to fulfill all tracking requirements.
    @track canvas;
    @track next;
    engine;
    
    actions = {
        'ArrowRight': () => this.engine.move(1),
        'ArrowLeft': () => this.engine.move(-1),
        'ArrowUp': () => this.engine.rotate(),
        'ArrowDown': () => this.engine.softDrop(),
        ' ': () => this.engine.hardDrop(),
        'Escape': () => this.reset(),
        'Enter': () => this.engine.playPause()
    };
    
    reset() {
        this.engine && this.engine.stop();
        
        this.canvas = new Canvas(10, 20);
        this.next = new Canvas(4, 4);
        this.engine = new Engine(this.canvas, this.next);
    }
    
    execute = (evt) => {
        evt.preventDefault();
        this.actions[evt.key] && this.actions[evt.key]();
    }
    
    connectedCallback() {
        document.addEventListener('keydown', this.execute);
        
        this.reset();
    }
    
    disconnectedCallback() {
        document.removeEventListener('keydown', this.execute);
    }
}