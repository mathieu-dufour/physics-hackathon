<template>
    <div id="canvas-wrapper" style="height: 80vh">

    </div>
</template>

<script>
    import {p5script, setCanvasDimensions, setMoverRadius, setMoverMass, setFluidById, reset, setPlotDataHandler} from "../simulator/PoolSideView";
    import P5 from "p5"

    export default {
        name: "PoolSideView",
        mounted() {
            const canvasWrapper = document.getElementById("canvas-wrapper")
            setCanvasDimensions(canvasWrapper.offsetWidth, canvasWrapper.offsetHeight)


            setMoverRadius(this.objectDiameter / (2 * 100));
            setMoverMass(this.objectMass / 1000);
            setFluidById(this.selectedFluid);
            setPlotDataHandler((plotData) => {this.$emit("plot-data-change", plotData)})

            new P5(p5script)
        },
        props: {
            objectDiameter: Number,
            objectMass: Number,
            selectedFluid: String
        },
        watch: {
            objectDiameter(diameter) {
                setMoverRadius(diameter / (2 * 100));
                reset()
            },
            objectMass(mass) {
                setMoverMass(mass / 1000)
                reset()
            },
            selectedFluid(viscosityFunction) {
                setFluidById(viscosityFunction)
                reset()
            }
        }
    }
</script>

<style scoped>

</style>
