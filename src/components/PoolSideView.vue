<template>
    <div id="canvas-wrapper" style="height: 80vh">

    </div>
</template>

<script>
    import {p5script, setCanvasDimensions} from "../simulator/PoolSideView";
    import P5 from "p5"

    export default {
        name: "PoolSideView",
        mounted() {
            const canvasWrapper = document.getElementById("canvas-wrapper")
            setCanvasDimensions(canvasWrapper.offsetWidth, canvasWrapper.offsetHeight)

            new P5(p5script)
        }
    }
</script>

<style scoped>

</style>
