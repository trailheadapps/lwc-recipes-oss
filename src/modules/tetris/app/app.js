import { LightningElement, track } from 'lwc';
import Engine from '../engine/engine';
import Canvas from '../../game/model/canvas';

export default class App extends LightningElement {
    // Note: the canvas (array) needs to be declared here, to fulfill all tracking requirements.
    @track canvas;
    engine;
    
    actions = {
        ' ': () => this.engine.hardDrop(),
        'ArrowRight': () => this.engine.move(1),
        'ArrowLeft': () => this.engine.move(-1),
        'ArrowUp': () => this.engine.rotate(),
        'ArrowDown': () => this.engine.speedDrop(),
        'Escape': () => this.reset(),
        'Enter': () => this.engine.playPause()
    };
    
    reset() {
        this.engine && this.engine.stop();
        
        this.canvas = new Canvas(10, 20);
        this.engine = new Engine(this.canvas);
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