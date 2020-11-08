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
            return 20000 * velocity
        }
    }
]
