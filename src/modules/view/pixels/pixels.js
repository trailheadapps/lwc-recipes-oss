import { LightningElement, api } from "lwc";

export default class Pixels extends LightningElement {
    @api canvas = [];
    @api scale = 20;
    @api background;
    
    rethrowClick({target: {dataset: {x, y}}}) {
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