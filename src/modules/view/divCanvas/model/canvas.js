export default class Canvas extends Array {
    constructor(width, height, color) {
        super();
        array(height).forEach((y) => this.push(new Row(y, color, width)));
    }
    
    draw(x, y, shape, color) {
        shape.forPixel((xOffset, yOffset) => this.paint(x + xOffset, y + yOffset, color));
    }
    
    paint(x, y, color) {
        const pixel = this.pixel(x, y);
        pixel && pixel.paint(color);
    }
    
    move(source, target) {
        target.copyFrom(source);
        source.clear();
    }
    
    valid(x, y, shape) {
        return this.free(x, y, shape) && this.inside(x, y, shape);
    }
    
    free(x, y, shape) {
        let result = true;
        shape.forPixel((xOffset, yOffset) => result = (result && this.empty(x + xOffset, y + yOffset)));
        return result;
    }
    
    inside(x, y, shape) {
        let result = true;
        shape.forPixel((xOffset, yOffset) => result &&= y + yOffset < this.height);
        shape.forPixel((xOffset) => result &&= x + xOffset >= 0 && x + xOffset < this.width);
        return result;
    }
    
    empty(x, y) {
        const pixel = this.pixel(x, y);
        return !pixel || pixel.empty;
    }
    
    pixel(x, y) {
        return (this[y]) ? this[y][x] : undefined;
    }
    
    get height() {
        return this.length;
    }
    
    get width() {
        return this[0].length;
    }
    
    get center() {
        return Math.floor((this.width) / 2);
    }
}

class Row extends Array {
    key;
    
    constructor(y, color, width) {
        super(...array(width).map((x) => newPixel(x, y, color)));
        this.key = y;
    }
    
    copyFrom(other) {
        other.forEach((pixel, x) => this[x].paint(pixel.color));
    }
    
    fill(color) {
        this.forEach(((pixel) => pixel.paint(color)));
    }
    
    clear() {
        this.fill();
    }
    
    get empty() {
        return this.every(((pixel) => pixel.empty));
    }
    
    get full() {
        return this.every(((pixel) => !pixel.empty));
    }
}

function newPixel(x, y, color) {
    return {
        x, y, color,
        key: y + '_' + x,
        default: color,
        style: 'background-color: ' + color,
        paint: function(color = this.default) {
            this.color = color;
            this.style = 'background-color: ' + color;
        },
        get empty() { return this.color === this.default; }
    };
}

function array(n) {
    return [...Array(n).keys()];
}