export default class Engine {
    canvas;
    resolvers = [];
    speed = 10;
    
    constructor(canvas) {
        this.canvas = canvas;
        
        setInterval(() => {
            this.resolvers.forEach((resolve) => resolve());
            this.resolvers = [];
        }, this.speed);
    }
    
    async drop(x, {shape, color}) {
        for(let y = 1-shape.height;; y++) {
            const bottom = (y === this.canvas.height - shape.height);
            const blocked = (bottom || !this.empty(x, y+1, shape));
            const free = this.empty(x, y, shape);
            
            this.draw(x, y, shape, (free) ? color : 'red');
            
            if(blocked) break;
            
            await this.nextTick();
            
            this.clear(x, y, shape);
        }
    }
    
    draw(x, y, shape, color) {
        shape.perPixel((xOffset, yOffset) => this.canvas.paint(x+xOffset, y+yOffset, color));
    }
    
    clear(x, y, shape) {
        this.draw(x, y, shape);
    }
    
    empty(x, y, shape) {
        let result = true;
        shape.perPixel((xOffset, yOffset) => result = (result && this.canvas.empty(x+xOffset, y+yOffset)));
        return result;
    }
    
    nextTick() {
        return new Promise(resolve => this.resolvers.push(resolve));
    }
}