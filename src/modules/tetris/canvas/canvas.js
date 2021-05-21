export default class Canvas extends Array {
    
    constructor(color = 'black', width = 30, height = 30) {
        super();
        this.push(...this.array(height).map((y) => this.array(width).map((x) => this.newPixel(x, y, color))));
        this.forEach((row, i) => row.key = i);
    }
    
    newPixel(x, y, color) {
        return { x, y, color,
            key: y+'_'+x,
            default: color,
            style: 'background-color: ' + color,
            paint: function(color = this.default) {
                this.color = color;
                this.style = 'background-color: ' + color;
            },
            get empty() { return this.color === this.default }
        };
    }
    
    paint(x, y, color) {
        const pixel = this.pixel(x, y);
        pixel && pixel.paint(color);
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
    
    array(n) {
        return [...Array(n).keys()];
    }
}