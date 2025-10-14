
export interface Model {
    trnasformations: {transition: Transpose, colorMask: Color}; // Add colorMask property
}

export class Transpose {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

export class Color {
    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}