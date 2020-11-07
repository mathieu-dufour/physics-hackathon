let canvasWidth = 500;
let canvasHeight = 500;

export const setCanvasDimensions = (width, height) => {
    canvasWidth = width;
    canvasHeight = height;
}


export const p5script = (p5) => {
    p5.setup = () => {
        const canvas = p5.createCanvas(canvasWidth, canvasHeight);
        canvas.parent("canvas-wrapper")
        p5.background("grey")
    }
    p5.draw = () => {

    }
}
