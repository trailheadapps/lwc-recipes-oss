import { LightningElement, api } from "lwc";

export default class DivCanvas extends LightningElement {
    @api canvas = [];
    @api scale = 20;
    @api background;
    _border;
    
    @api set border(value) {
        this._border = 'border: ' + value;
    }
    
    get border() {
        return this._border;
    }
    
    dispatchClick({target: {dataset: {x, y}}}) {
        x = Number(x);
        y = Number(y);
        this.dispatchEvent(new CustomEvent('pixelclick', {detail: {x, y}}))
    }
    
    get canvasStyle() {
        return `width: ${this.scale * this.canvas.width}px; background: ${this.background}`;
    }
    
    get rowHeight() {
        return `height: ${this.scale}px`;
    }
}