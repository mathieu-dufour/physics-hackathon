export default [
    {
        "id": "water",
        "name": "Water",
        "viscosityFunction": function (velocity) {
            return 0.002 * velocity
        },
        "density": 997,
        "backgroundColor": "#00c3ff"
    },
    {
        "id": "cornstarch",
        "name": "Corn starch",
        "viscosityFunction": function (velocity) {
            return 40 * Math.exp(velocity)
        },
        "density": 600,
        "backgroundColor": "white"
    }
]
