import { LightningElement, track } from 'lwc';
import Engine from './engine/engine';
import Canvas from '../../view/divCanvas/model/canvas';

export default class Tetris extends LightningElement {
    // Note: the canvas (array) needs to be declared here, to fulfill all tracking requirements.
    @track canvas;
    @track nextView;
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
        this.nextView = new Canvas(4, 4);
        this.engine = new Engine(this.canvas, this.nextView);
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
    
    get level() {
        return this.engine.level;
    }
    
    get score() {
        return this.engine.score;
    }
}