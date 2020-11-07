// inputs
let canvasWidth = 500;
let canvasHeight = 500;
let moverRadius = 100;
let moverMass = 100;

const CANVAS_HEIGHT_METER = 5;
const FRAME_PER_SECOND = 60;
const GRAVITATIONAL_CONSTANT = 9.81;

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

        fluid = new Fluid(0, p5.height / 1.5, p5.width, p5.height / 3, 0.001)
        reset();
        p5.frameRate(FRAME_PER_SECOND);
    }

    p5.draw = () => {
        console.log(ball)
        p5.background("grey")

        fluid.display();

        if (fluid.contains(ball)) {
            let dragForce = fluid.calculateDragForce(ball);
            ball.applyForce(dragForce);
        }
        let gravity = p5.createVector(0, GRAVITATIONAL_CONSTANT * ball.mass);
        ball.display();
        ball.applyForce(gravity);
        ball.update();
        ball.checkBottomEdge();
    }

    // Reset ball to initial position
    function reset() {
        ball = new Mover(moverMass, moverRadius / pixelToMeter(), p5.width / 2, p5.height * 0.25);
    }

    // Body falling in non-newtonian fluid
    class Mover {
        constructor(mass, radius, x, y) {
            this.mass = mass; // kg
            this.radius = radius; // pixels
            this.position = p5.createVector(x, y); // pixels
            this.velocity = p5.createVector(0, 0); // pixels / frame
            this.acceleration = p5.createVector(0, 0); // pixels / frame^2
        }

        display() {
            p5.noStroke();
            p5.fill(255, 42, 0);
            p5.circle(this.position.x, this.position.y, this.radius * 2);
        }

        // Newton's 2nd law: F = M * A
        // or A = F / M
        applyForce(force) {
            let acceleration = force.div(this.mass).mult(Math.pow(FRAME_PER_SECOND, 1)).mult(pixelToMeter())
            this.acceleration.add(acceleration);
        }

        // Update position based on velocity
        update() {
            // Velocity changes according to acceleration
            this.velocity.add(this.acceleration);
            // position changes by velocity
            this.position.add(this.velocity);
            // We must clear acceleration each frame
            this.acceleration.mult(0);
        }

        // Bounce of bottom edge
        checkBottomEdge() {
            if (this.position.y > (p5.height - this.radius)) {
                // A little dampening when hitting the bottom
                this.velocity.y *= -0.9;
                this.position.y = (p5.height - this.radius);
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
            let mover_y = mover.position.y;
            return mover_y > this.y && mover_y < this.y + this.height;
        }

        calculateDragForce(mover) {
            // Speed is magnitude of mover velocity vector
            let speed = pixelToMeter() * mover.velocity.mag() * FRAME_PER_SECOND; // m/s
            //Magnitude is coefficient * squared speed
            // Assume drag coefficient is 0.5 for a sphere
            let dragMagnitude = (1 / 4) * p5.PI * Math.pow(mover.radius, 2) * this.density * Math.pow(speed, 2);

            // Direction is inverse of velocity
            return mover.velocity.copy().normalize().mult(-dragMagnitude);
        }
    }
}
