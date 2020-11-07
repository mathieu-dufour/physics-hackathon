let canvasWidth = 500;
let canvasHeight = 500;

export const setCanvasDimensions = (width, height) => {
    canvasWidth = width;
    canvasHeight = height;
}


export const p5script = (p5) => {
    // Body falling in non-newtonian fluid
    let ball;
    let fluid;

    p5.setup = () => {        
        const canvas = p5.createCanvas(canvasWidth, canvasHeight);
        canvas.parent("canvas-wrapper")

        fluid = new Fluid(0, p5.height / 1.5, p5.width, p5.height / 3, 0.1)
        reset();
    }

    p5.draw = () => {
        // p5.background(245);
        p5.background("grey")

        fluid.display();

        if (fluid.contains(ball)) {
            let dragForce = fluid.calculateDrag(ball);
            ball.applyForce(dragForce);
        }

        let gravity = p5.createVector(0, 0.1 * ball.mass);
        ball.display();
        ball.applyForce(gravity);
        ball.update();
        ball.checkEdges();
    }

    // Reset ball to initial position
    function reset() {
        ball = new Mover(3, p5.width / 2, p5.height * 0.25);
    }

    // Body falling in non-newtonian fluid
    class Mover {
        constructor(mass, x, y) {
            this.mass = mass;
            this.position = p5.createVector(x, y);
            this.velocity = p5.createVector(0, 0);
            this.acceleration = p5.createVector(0, 0);
        }

        display() {
            p5.noStroke();
            p5.fill(255, 42, 0);
            p5.ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
        }

        // Newton's 2nd law: F = M * A
        // or A = F / M
        applyForce(force) {
            let f = force.div(this.mass)
            this.acceleration.add(f);
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
        checkEdges() {
            if (this.position.y > (p5.height - this.mass * 8)) {
                // A little dampening when hitting the bottom
                this.velocity.y *= -0.9;
                this.position.y = (p5.height - this.mass * 8);
            }
        }
    }

    // Non-Newtonian fluid in which mover falls
    class Fluid {
        constructor(x, y, width, height, coefficient) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.coef = coefficient;
        }

        // Display fluid on canvas
        display() {
            p5.noStroke();
            p5.fill(0, 195, 255);
            p5.rect(this.x, this.y, this.width, this.height);
        }

        // Check if mover is in liquid
        contains(mover) {
            let mover_y = mover.position.y;
            return mover_y > this.y && mover_y < this.y + this.height;
        }

        calculateDrag(mover) {
            // Speed is magnitude of mover velocity vector
            let speed = mover.velocity.mag();
            //Magnitude is coefficient * squared speed
            let dragMagnitude = this.coef * speed * speed;

            // Direction is inverse of velocity
            let dragForce = mover.velocity.copy();
            dragForce.mult(-1);

            // Scale according to magnitude
            // dragForce.setMag(dragMagnitude);
            dragForce.normalize();
            dragForce.mult(dragMagnitude);
            return dragForce;
        }
    }
}
