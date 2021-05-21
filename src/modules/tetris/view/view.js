import { LightningElement, track } from "lwc";
import {bar, L} from '../model/bricks'
import Engine from '../engine/engine';
import Canvas from '../canvas/canvas';


export default class View extends LightningElement {
    // Note: the Canvas (array) needs to be declared here, to fulfill all tracking requirements.
    @track canvas;
    engine;
    
    connectedCallback() {
        this.reset();
    }
    
    reset(color) {
        this.canvas = new Canvas(color, 10, 20);
        this.engine = new Engine(this.canvas);
    }
    
    handleClick({target: {dataset: {x, y}}}) {
        x = Number(x);
        y = Number(y);
        
        switch(this.template.querySelector('select').value) {
            case 'bar': this.engine.drop(x, bar); break;
            case 'drop': this.engine.drop(x, L); break;
            case 'brick': this.engine.draw(x, y, L.shape, 'green'); break;
            case 'paint': this.canvas.paint(x, y, 'red'); break;
            case 'reset': this.reset('grey'); break;
        }
    }
}