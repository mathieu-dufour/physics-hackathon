export const p5script = (p5) => {
    // Body falling in non-newtonian fluid
    let ball;
    // let fluid;

    p5.setup = () => {
        p5.createCanvas(500, 500);
        reset();

        // fluid = new Fluid(0, p5.height / 2, p5.width, p5.height / 2, 0.1)
    }

    p5.draw = () => {
        p5.background(245);
        // fluid.display();

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

    // // Non-Newtonian fluid in which mover falls
    // class Fluid {
    //     constructor(x, y, width, height, c) {
    //         this.x = x;
    //         this.y = y;
    //         this.width = width;
    //         this.height = height;
    //         this.c = c;
    //     }

    //     // Display fluid on canvas
    //     display() {
    //         p5.noStroke();
    //         p5.fill(0, 195, 255);
    //         p5.rect(this.x, this.y, this.width, this.height);
    //     }

    //     // Check if mover is in liquid
    //     contains(mover) {
    //         let mover_y = mover.position.y;
    //         return mover_y > this.y && mover_y < this.y + this.height;
    //     }
    // }
}
