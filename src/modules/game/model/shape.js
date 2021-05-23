export default class Shape extends Array {
    
    clone() {
        return new Shape(...this);
    }
    
    forPixel(callback) {
        this.forEach((row, yOffset) => {
            row.forEach((binary, xOffset) => binary && callback(xOffset, yOffset));
        })
    }
    
    rotate() {
        this.splice(0, Infinity,
            ...this[0].map((col, i) => this.map(row => row[i]).reverse())
        );
    }
    
    rotated() {
        const result = this.clone();
        result.rotate();
        return result;
    }
    
    get height() {
        return this.length;
    }
    
    get width() {
        return this.length;
    }
}