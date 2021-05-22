import { LightningElement, track } from "lwc";
import {O, I, L, J, E, S, Z} from '../model/bricks';
import Engine from '../engine/engine';
import Canvas from '../canvas/canvas';


export default class View extends LightningElement {
    // Note: the Canvas (array) needs to be declared here, to fulfill all tracking requirements.
    @track canvas;
    engine;
    
    constructor() {
        super();
        this.template.addEventListener('keydown', this.handleKeyPress.bind(this));
    }
    
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
            case 'paint': this.canvas.paint(x, y, 'red'); break;
            case 'brick': this.canvas.draw(x, y, L.shape, 'green'); break;
            case 'start': this.engine.run(); break;
            case 'reset': this.reset(); break;
        }
    }
    
    handleKeyPress({key}){
        switch (key) {
            case ' ':  this.engine.hardDrop(); break;
            case 'ArrowRight': this.engine.moveRight(); break;
            case 'ArrowLeft': this.engine.moveLeft(); break;
        }
    }
}