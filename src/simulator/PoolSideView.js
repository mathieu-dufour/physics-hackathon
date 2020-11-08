// inputs
let canvasWidth = 500;
let canvasHeight = 500;
let moverRadius = 100;
let moverMass = 100;
let resetOnNextFrame = false;

const CANVAS_HEIGHT_METER = 5;
const FRAME_PER_SECOND = 60;
const GRAVITATIONAL_CONSTANT = 9.81;
const WATER_DRAG_COEFFICIENT = 0.5;
const WATER_DENSITY = 997;

export const setCanvasDimensions = (width, height) => {
    canvasWidth = width;
    canvasHeight = height;
}

export const setMoverRadius = (radius) => {
    moverRadius = radius;
}

export const setMoverMass = (mass) => {
    moverMass = mass;
}

export const reset = () => {
    resetOnNextFrame = true;
}

let pixelToMeter = () => CANVAS_HEIGHT_METER / canvasHeight;

export const p5script = (p5) => {
    // Body falling in non-newtonian fluid
    let ball;
    let fluid;

    p5.setup = () => {
        const canvas = p5.createCanvas(canvasWidth, canvasHeight);
        canvas.parent("canvas-wrapper")

        // Reset mover position when canvas is clicked
        canvas.mousePressed(reset);

        fluid = new Fluid(0, p5.height / 1.5, p5.width, p5.height / 3, WATER_DENSITY)
        reset();
        p5.frameRate(FRAME_PER_SECOND);
    }

    p5.draw = () => {
        if (resetOnNextFrame) {
            reset();
            resetOnNextFrame = false;
        }
        p5.background("grey")

        fluid.display();

        if (fluid.contains(ball)) {
            let dragForce = fluid.calculateDragForce(ball);
            ball.applyForce(dragForce);
        }
        let gravity = GRAVITATIONAL_CONSTANT * ball.mass;
        ball.display();
        ball.applyForce(gravity);
        ball.update();
        ball.checkBottomEdge();
    }

    // Reset ball to initial position
    function reset() {
        ball = new Mover(moverMass, moverRadius / pixelToMeter(), p5.height * 0.25);
    }

    // Body falling in non-newtonian fluid
    class Mover {
        constructor(mass, radius, y) {
            this.mass = mass; // kg
            this.radius = radius; // pixels
            this.position = y // pixels
            this.velocity = 0; // pixels / frame
            this.acceleration = 0; // pixels / frame^2
        }

        display() {
            p5.noStroke();
            p5.fill(255, 42, 0);
            p5.circle(p5.width / 2, this.position, this.radius * 2);
        }

        // Newton's 2nd law: F = M * A
        // or A = F / M
        applyForce(force) {
            let accelerationSI = force / this.mass; // m/s^2

            // px / frame^2 = m/s^2 * s^2/frame^2 * px/m
            let acceleration = accelerationSI / (Math.pow(FRAME_PER_SECOND, 2) * pixelToMeter());
            this.acceleration += acceleration;
        }

        // Update position based on velocity
        update() {
            // Velocity changes according to acceleration
            this.velocity += this.acceleration;
            if (((this.position > (p5.height - this.radius)) == false) && this.velocity < 0) {
                this.velocity = 0;
            }
            // position changes by velocity
            this.position += this.velocity;
            // We must clear acceleration each frame
            this.acceleration = 0;
        }

        // Bounce of bottom edge
        checkBottomEdge() {
            if (this.position > (p5.height - this.radius)) {
                // A little dampening when hitting the bottom
                this.velocity *= -0.9;
                this.position = (p5.height - this.radius);
            }
        }
    }

    // Non-Newtonian fluid in which mover falls
    class Fluid {
        constructor(x, y, width, height, density) {
            this.x = x; // pixels
            this.y = y; // pixels
            this.width = width; // pixels
            this.height = height; // pixels
            this.density = density; // kg/m^3
        }

        // Display fluid on canvas
        display() {
            p5.noStroke();
            p5.fill(0, 195, 255);
            p5.rect(this.x, this.y, this.width, this.height);
        }

        // Check if mover is in liquid
        contains(mover) {
            // TODO: Calculate surface of mover touching the fluid
            // TODO: Calculate volume of mover in the fluid
            return mover.position > this.y && mover.position < this.y + this.height;
        }

        calculateDragForce(mover) {
            // Speed is magnitude of mover velocity vector
            let speed = pixelToMeter() * mover.velocity * FRAME_PER_SECOND; // m/s
            //Magnitude is coefficient * squared speed
            let area = p5.PI * Math.pow(mover.radius * pixelToMeter(), 2);
            let dragMagnitude = (1 / 2) * WATER_DRAG_COEFFICIENT * area * this.density * Math.pow(speed, 2);

            // Direction is inverse of velocity
            return Math.sign(mover.velocity) * -dragMagnitude;
        }
    }
}
