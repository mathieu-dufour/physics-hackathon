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
                        borderColor: '#00c3ff',
                        borderWidth: 1
                    }]
                }, {
                    title: "GGG",
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                            title() {
                                return ""
                            },
                            label: function(tooltipItem) {
                                let speed = Math.round(tooltipItem.yLabel * 100) / 100;
                                let depth = Math.round(tooltipItem.xLabel * 100) / 100;
                                return `Speed: ${speed} m/s, depth: ${depth} m`;
                            }
                        }
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
