<script>
    import {Line} from "vue-chartjs"

    export default {
        name: "ViscosityPlot",
        extends: Line,
        props: {
            data: Array
        },
        watch: {
            data(data) {
                this.renderChart({
                    datasets: [{
                        data: data,
                        backgroundColor: 'rgba(255, 99, 132, 0.0)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                }, {
                    title: "GGG",
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            type: "linear",
                            position: "bottom",
                            ticks: {
                                fontColor: "#BBB"
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Depth (m)",
                                fontColor: "white"
                            }
                        }],
                        yAxes: [{
                            type: "linear",
                            position: "left",
                            ticks: {
                                fontColor: "#BBB"
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Speed (m/s)",
                                fontColor: "white"
                            }
                        }]
                    },
                    responsive: true,
                    maintainAspectRatio: false
                })
            }
        }
    }
</script>

<style scoped>

</style>
