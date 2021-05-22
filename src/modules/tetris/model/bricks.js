class Shape extends Array {
    perPixel(callback) {
        this.forEach((row, yOffset) => {
            row.forEach((binary, xOffset) => binary && callback(xOffset, yOffset));
        })
    }
    
    get height() {
        return this.length;
    }
    
    get width() {
        return this[0].length;
    }
}

export const O = {color: 'yellow', shape: new Shape([1,1], [1,1])};
export const E = {color: 'green', shape: new Shape([0,1,0], [1,1,1])};
export const L = {color: 'maroon', shape: new Shape([1,1,1], [0,0,1])};
export const J = {color: 'red', shape: new Shape([0,0,1],[1,1,1])};
export const Z = {color: 'purple', shape: new Shape([1,1,0],[0,1,1])};
export const S = {color: 'orange', shape: new Shape([0,1,1],[1,1,0])};
export const I = {color: 'blue', shape: new Shape([1],[1],[1],[1])};