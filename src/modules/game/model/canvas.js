export default class Canvas extends Array {
    constructor(width, height, color) {
        super();
        this.array(height)
            .forEach((y) => {
                const row = this.array(width).map((x) => this.newPixel(x, y, color));
                row.key = y;
                this.push(row);
            });
        console.log(this);
    }
    
    newPixel(x, y, color) {
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
    
    paint(x, y, color) {
        const pixel = this.pixel(x, y);
        pixel && pixel.paint(color);
    }
    
    draw(x, y, shape, color) {
        shape.forPixel((xOffset, yOffset) => this.paint(x + xOffset, y + yOffset, color));
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
        const yInside = (y <= this.height - shape.height);
        const xInside = (x >= 0 && x <= this.width - shape.width);
        return yInside && xInside;
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
    
    array(n) {
        return [...Array(n).keys()];
    }
}