// inputs
import FluidList from "../models/FluidList";

let canvasWidth = 500;
let canvasHeight = 500;
let moverRadius = 100;
let moverMass = 100;
let fluidProperties = undefined;
let resetOnNextFrame = false;
let plotDataHandler;
let plotData = [];

const CANVAS_HEIGHT_METER = 5;
const FRAME_PER_SECOND = 60;
const GRAVITATIONAL_CONSTANT = 9.81;
const WATER_DRAG_COEFFICIENT = 0.5;

// plot settings
const MAX_PLOT_POINTS = 100;

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

export const setFluidById = (fluidId) => {
    fluidProperties = FluidList.filter((f) => f.id === fluidId)[0];
}

export const setPlotDataHandler = (handler) => {
    plotDataHandler = handler;
}

export const reset = () => {
    resetOnNextFrame = true;
}

let pixelToMeter = () => CANVAS_HEIGHT_METER / canvasHeight;

export const p5script = (p5) => {
    // Body falling in non-newtonian fluid
    let ball;
    let fluid;

    let basket;
    let kinball;
    let beachball;
    let bowling;
    let globe;

    p5.setup = () => {
        const canvas = p5.createCanvas(canvasWidth, canvasHeight);
        canvas.parent("canvas-wrapper")

        // TODO: Change images
        basket = p5.loadImage('wrecking_ball.png');
        kinball = p5.loadImage('wrecking_ball.png');
        beachball = p5.loadImage('wrecking_ball.png');
        bowling = p5.loadImage('wrecking_ball.png')
        globe = p5.loadImage('wrecking_ball.png')

        // Reset mover position when canvas is clicked
        canvas.mousePressed(() => reset(p5.mouseY));

        reset();
        p5.frameRate(FRAME_PER_SECOND);
    }

    p5.draw = () => {
        if (resetOnNextFrame) {
            reset();
            resetOnNextFrame = false;
        }
        p5.background("grey")

        if (!fluid.contains(ball)) {
            fluid.display();
        }

        if (fluid.contains(ball)) {
            fluid.calcWave(ball.velocity);
            fluid.renderWave();
            let dragForce = fluid.calculateDragForce(ball);
            ball.applyForce(dragForce);
            let buoyancyForce = fluid.calculateBuoyancy(ball);
            ball.applyForce(-buoyancyForce);
            let viscousForce = fluid.calculateViscousforce(ball);
            ball.applyForce(viscousForce);
        }
        let gravity = GRAVITATIONAL_CONSTANT * ball.mass;
        ball.display();
        ball.applyForce(gravity);
        ball.update();
        ball.checkBottomEdge();

        // Add data points to the plot
        if (plotData.length < MAX_PLOT_POINTS && fluid.contains(ball)) {
            plotData.push({x: (ball.position - p5.height + fluid.height) * pixelToMeter(), y: ball.velocity})
        }
        plotDataHandler(plotData)
    }

    // Reset ball to initial position
    function reset(yBallPosition) {
        if (!yBallPosition || yBallPosition > p5.height / 1.5) {
            yBallPosition = p5.height * 0.25
        }
        plotData = [];
        plotDataHandler(plotData)
        ball = new Mover(moverMass, moverRadius / pixelToMeter(), yBallPosition);
        fluid = new Fluid(0, p5.height / 1.5, p5.width, p5.height / 3, fluidProperties);
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

            let selectedImage;
            if (this.radius > 0.30/pixelToMeter()){
                if (this.mass > 0.5) {
                    selectedImage = globe;
                } else {
                    selectedImage = kinball;
                }

            } else {
                if (this.mass <= 1 && this.mass >= 0.66){
                    selectedImage = bowling;
                } else if (this.mass >0.33 && this.mass < 0.66){
                    selectedImage = basket;
                }
                else  {
                    selectedImage = beachball;
                }
            }
            p5.image(selectedImage, p5.width / 2 - this.radius, this.position- this.radius,this.radius * 2,this.radius * 2);
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
            if (!(this.position > (p5.height - this.radius)) && this.velocity < 0) {
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
        constructor(x, y, width, height, fluidProperties) {
            this.x = x; // pixels
            this.y = y; // pixels
            this.width = width; // pixels
            this.height = height; // pixels
            this.density = fluidProperties.density; // kg/m^3
            this.viscosityFunction = fluidProperties.viscosityFunction;

            this.ballInitialVelocity = undefined; // set on initial ball impact
            this.theta = 0; // Start angle at 0
            this.amplitude = 5 * moverMass + moverRadius * 1.5; // Height of wave
            this.period = 30 + moverRadius * 50; // How many pixels before the wave repeats
            this.dx; // Value for incrementing x
            this.yvalues; // Using an array to store height values for the wave
            this.decay = 0.068; // Increasingly reduce value by this factor
            this.dx = (p5.TWO_PI / this.period);
            this.yvalues = new Array(width);
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

        calculateBuoyancy(mover) {
            let volume = p5.PI * Math.pow(mover.radius * pixelToMeter(), 3);
            return 4 / 3 * p5.PI * volume;
        }

        calculateViscousforce(mover) {
            let speed = pixelToMeter() * mover.velocity * FRAME_PER_SECOND; // m/s
            let spherearea = 4 * p5.PI * Math.pow(mover.radius * pixelToMeter(), 2);
            let viscousMagnitude = this.viscosityFunction(speed) * spherearea;
            return Math.sign(mover.velocity) * -viscousMagnitude;
        }

        calcWave(ballVelocity) {
            if (!this.ballInitialVelocity) {
                this.ballInitialVelocity = ballVelocity
            }

            // Increment theta (try different values for
            // 'angular velocity' here)
            this.theta += 0.2;

            // For every x value, calculate a y value with sine function
            let x = this.theta;
            for (let i = p5.width / 2 - 1; i >= 0; i--) {
                let y = this.ballInitialVelocity * this.amplitude * p5.exp(-this.decay * x) * p5.cos(this.dx * x - this.theta);
                this.yvalues[i] = y;
                this.yvalues[p5.width - i] = y;
                //yvalues[t] = sin(x) * amplitude;
                x += this.dx;
            }
        }

        renderWave() {
            p5.noStroke();
            p5.fill(0, 195, 255);
            p5.beginShape();
            p5.vertex(0, p5.height)
            for (let x = 0; x < this.yvalues.length; x++) {
                p5.vertex(x, this.height * 2 + this.yvalues[x])
            }
            p5.vertex(p5.width, p5.height);
            p5.endShape();
        }
    }
}
