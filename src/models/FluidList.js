export default [
    {
        "id": "water",
        "name": "Water",
        "viscosityFunction": function (velocity) {
            return 0.002 * velocity
        },
        "density": 997
    },
    {
        "id": "cornstarch",
        "name": "Corn starch",
        "viscosityFunction": function (velocity) {
            // TODO: Change corn starch viscosity function
            //if (velocity > 5){
                //console.log("corn")
                return 40 * Math.exp(velocity)
            //} else {return 0.0002 * velocity}
        },
        "density": 600
    }
]
