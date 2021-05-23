import { O, I, L, J, E, S, Z, Brick } from '../model/bricks';
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
    
    playPause() {
        switch(this.state) {
            case 'new':
                this.state = "running";
                this.insert();
                break;
            case 'paused':
                this.state = "running";
                this.nextTick = setTimeout(() => this.move(0, 1), this.speed);
                break;
            case 'running':
                clearTimeout(this.nextTick);
                this.state = "paused";
                break;
        }
    }
    
    stop() {
        clearTimeout(this.nextTick);
        this.state = "paused";
    }
    
    rotate() {
        if(this.state !== "running") return;
        const {x, y, brick: {shape}} = this.current;
        
        this.hide();
        if(this.canvas.valid(x, y, shape.rotated())) {
            shape.rotate();
        }
        this.visualize();
    }
    
    speedDrop() {
        if(this.state !== "running") return;
        clearTimeout(this.nextTick);
        this.move(0, 1);
    }
    
    hardDrop() {
        if(this.state !== "running") return;
        this.current && this.move(0, this.canvas.height + 1);
    }
    
    move(xOffset, yOffset = 0) {
        if(this.state !== "running") return;
        const {x, y, brick: {shape}} = this.current;
        
        const newX = x+xOffset;
        const newY = y+yOffset;
        
        this.hide();
        this.current.x = this.lastPossible(x, newX, (x) => this.canvas.valid(x, y, shape));
        this.current.y = this.lastPossible(y, newY, (y) => this.canvas.valid(x, y, shape));
        this.visualize();
    
        clearTimeout(this.nextTick);
        this.nextTick = setTimeout(() => this.move(0, 1), this.speed);
        
        const locked = (this.current.y !== newY);
        if(locked) {
            delete this.current;
            clearTimeout(this.nextTick);
            this.clearTetris();
            
            this.insert();
        }
    }
    
    clearTetris() {
        this.canvas.forEach((row) => row.full && row.clear());
        
        const scope = [...this.canvas].reverse();
        for(let row of [...this.canvas].reverse()) {
            if(scope.shift().empty) {
                const pivot = scope.find((pivot) => !pivot.empty);
                if(!pivot) break;
                this.canvas.move(pivot, row);
            }
        }
    }
    
    insert(x = this.canvas.center, y = -1, brick = this.randomBrick()) {
        
        if(this.canvas.valid(x, y, brick.shape)) {
            this.current = {x, y, brick};
            this.move(0, 0);
        }
        else {
            this.gameOver();
        }
        
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
        return new Brick(bricks[Math.floor(Math.random() * bricks.length)]);
    }
}