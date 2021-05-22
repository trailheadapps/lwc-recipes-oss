import {O, I, L, J, E, S, Z} from '../model/bricks';
const bricks = [O, I, L, J, E, S, Z];

export default class Engine {
    canvas;
    
    nextDrop;
    speed = 100;
    current;
    
    constructor(canvas) {
        this.canvas = canvas;
    }
    
    run() {
       this.insert();
    }
    
    hardDrop() {
        this.move(0, this.canvas.height + 1);
    }
    
    insert(brick = this.randomBrick()) {
        this.current = {x: this.canvas.center, y: -brick.shape.height, brick};
        this.move(0, 1);
    }
    
    move(xOffset, yOffset, {x, y} = this.current) {
        const newX = x+xOffset;
        const newY = y+yOffset;
        
        if(this.movedTo(newX, newY)) {
            this.nextDrop = setTimeout(() => this.move(0, 1), this.speed)
        }
        else {
            const visible = this.visible();
            this.current = undefined;
            clearTimeout(this.nextDrop);
    
            visible ? this.insert() : alert('Game Over');
        }
    }
    
    movedTo(newX, newY, {x, y, brick: {shape}} = this.current) {
        this.hide();
        
        this.current.x = this.lastPossible(x, newX, (x) => this.canvas.valid(x, y, shape));
        this.current.y = this.lastPossible(y, newY, (y) => this.canvas.valid(x, y, shape));
        
        this.visualize();
        
        return (this.current.x === newX && this.current.y === newY);
    }
    
    lastPossible(start, destination, valid) {
        for(let possible = start; possible < destination; possible++) {
            const next = (start < destination) ? possible + 1 : possible -1;
            
            if(!valid(next)) {
                return possible;
            }
        }
        
        return destination;
    }
    
    hide({x, y, brick: {shape}} = this.current) {
        this.canvas.draw(x, y, shape);
    }
    
    visualize({x, y, brick: {shape, color}} = this.current) {
        this.canvas.draw(x, y, shape, color);
    }
    
    visible({y, brick: {shape: {height}}} = this.current) {
        return (y + height > 0);
    }
    
    randomBrick() {
        return bricks[Math.floor(Math.random() * bricks.length)];
    }
}