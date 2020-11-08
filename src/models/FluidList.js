export default [
    {
        "id": "water",
        "name": "Water",
        "viscosityFunction": function (velocity) {
            return 0.002 * velocity
        }
    },
    {
        "id": "cornstarch",
        "name": "Corn starch",
        "viscosityFunction": function (velocity) {
            // TODO: Change corn starch viscosity function
            if (velocity > 1){
                console.log("corn")
                return 200000000000 * velocity
            } else {return 0.00000000002 * velocity}
        }
    }
]
