import Shape from '../../../view/divCanvas/model/shape';

export const O = {color: 'yellow', shape: new Shape([0,0,0,0],[0,1,1,0], [0,1,1,0],[0,0,0,0],)};
export const E = {color: 'green', shape: new Shape([0,0,0], [1,1,1], [0,1,0])};
export const L = {color: 'maroon', shape: new Shape([0,0,0], [1,1,1], [1,0,0])};
export const J = {color: 'red', shape: new Shape([0,0,0], [1,1,1], [0,0,1])};
export const Z = {color: 'purple', shape: new Shape([0,0,0], [1,1,0],[0,1,1],[0,0,0])};
export const S = {color: 'orange', shape: new Shape([0,0,0], [0,1,1],[1,1,0],[0,0,0])};
export const I = {color: 'blue', shape: new Shape([0,0,0,0],[1,1,1,1],[0,0,0,0])};

export class Brick {
    color;
    shape;
    
    constructor({shape, color}) {
        this.shape = shape.clone();
        this.color = color;
    }
}