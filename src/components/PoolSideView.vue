<template>
    <div>

    </div>
</template>

<script>
    import {p5script} from "../simulator/PoolSideView";

    export default {
        name: "PoolSideView",
        mounted() {
            const P5 = require("p5")
            new P5(p5script)
        }
    }
</script>

<style scoped>

</style>
