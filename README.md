# Ez Fluid Simulator

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Inspiration

Our childhood dream of throwing objects in a water-based cornstarch mixture all got us together working on this beautiful project.

This is not a job. This is a dream. This is our vision.

## What it does

The simulator uses the following forces on the object:

- Gravity
- Inertial drag
- Viscous drag
- Buoyancy

In order to compute these forces, the main fluid properties are taken into account:

- Density
- Dynamic viscosity

When the collision happens, a wave is generated based on the momentum and the diameter of the object. Viscosity of the selected fluid also affects how the waves behave.

For each simulation, the speed and position of the object is recorded and displayed on a beautiful plot. This helps see the effects of non-newtonian fluids on the speed of objects.

## How I built it

The simulation’s graphics are created with the library p5.js for maximum speed of development.

In order to create dazzling aesthetics, we used Vuetify, a material design component library for Vue.Js.

The plot is generated using Chart.Js.

## Challenges I ran into

Unlike in the real world, virtual objects had a tendency to disregard the law of conservation of energy.

## Accomplishments that I'm proud of

Having a working MVP after 24 hours.

## What I learned

This was a great opportunity to have a first experience creating 2d graphics with p5.js library.

## What's next for Ez Fluid Simulator

- Adding mayonnaise as an available fluid
- Export simulation data to CSV files

