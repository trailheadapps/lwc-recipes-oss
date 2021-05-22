import {O, I, L, J, E, S, Z} from '../model/bricks';
const bricks = [O, I, L, J, E, S, Z];

export default class Engine {
    canvas;
    current;
    
    speed = 200;
    nextTick;
    state = 'new';
    
    constructor(canvas) {
        this.canvas = canvas;
    }
    
    run() {
       this.state === "new" && this.insert();
       this.state = "running";
    }
    
    pause() {
        clearTimeout(this.nextTick);
        this.state = "paused";
    }
    
    rotate() {
        this.hide();
        this.current.brick.shape.rotate();
        this.visualize();
    }
    
    hardDrop() {
        this.current && this.move(0, this.canvas.height + 1);
    }
    
    move(xOffset, yOffset = 0, {x, y, brick: {shape}} = this.current) {
        const newX = x+xOffset;
        const newY = y+yOffset;
    
        this.hide();
        this.current.x = this.lastPossible(x, newX, (x) => this.canvas.valid(x, y, shape));
        this.current.y = this.lastPossible(y, newY, (y) => this.canvas.valid(x, y, shape));
        this.visualize();
    
        if(yOffset) {
            clearTimeout(this.nextTick);
    
            if(this.current.y === newY) {
                this.nextTick = setTimeout(() => this.move(0, 1), this.speed)
            }
            else {
                const visible = this.visible();
                delete this.current;
        
                visible ? this.insert() : this.gameOver();
            }
        }
    }
    
    insert(brick = this.randomBrick()) {
        this.current = {x: this.canvas.center, y: -brick.shape.height, brick};
        this.move(0, 1);
    }
    
    gameOver() {
        alert('Game Over');
        this.state = "game over";
    }
    
    lastPossible(start, destination, valid) {
        const modifier = (start < destination) ? +1 : -1;
        
        for(let possible = start; possible !== destination; possible += modifier) {
            const next = possible + modifier;
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