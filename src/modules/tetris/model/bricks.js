class Shape extends Array {
    perPixel(callback) {
        this.forEach((row, yOffset) => {
            row.forEach((binary, xOffset) => binary && callback(xOffset, yOffset));
        })
    }
    
    get height() {
        return this.length;
    }
}

export const L = {color: 'purple', shape: new Shape([1,1,1], [0,0,1])};
export const bar = {color: 'blue', shape: new Shape([1],[1],[1],[1])};