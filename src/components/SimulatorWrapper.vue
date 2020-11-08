<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="8">
                    <v-card>
                        <v-card-text>
                            <PoolSideView
                                    :objectDiameter="objectDiameter"
                                    :objectMass="objectMass"
                                    :selectedFluid="selectedFluid"
                                    @plot-data-change="plotDataHandler"
                            ></PoolSideView>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card>
                        <v-card-title>Object Properties</v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="4">
                                        <v-subheader>Mass</v-subheader>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-text-field
                                                suffix="grams"
                                                type="number"
                                                v-model.number="objectMass"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-slider
                                            v-model.number="objectMass"
                                            :min="minObjectMass"
                                            :max="maxObjectMass"
                                    />
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-subheader>Diameter</v-subheader>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-text-field
                                                suffix="cm"
                                                type="number"
                                                v-model.number="objectDiameter"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-slider
                                            v-model="objectDiameter"
                                            :min="minObjectDiameter"
                                            :max="maxObjectDiameter"
                                    />
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                    <v-card class="mt-5">
                        <v-card-title>Fluid Properties</v-card-title>
                        <v-card-text>
                            <v-container fluid>
                                <v-row>
                                    <v-col cols="4">
                                        <v-subheader>Type</v-subheader>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-select
                                                :items="fluidList"
                                                v-model="selectedFluid"
                                                item-text="name"
                                                item-value="id"
                                        ></v-select>
                                    </v-col>
                                </v-row>
                                <v-row id="viscosity-plot-wrapper">
                                    <viscosity-plot :width="viscosityPlotWidth" height="300" :data="viscosityPlotData"/>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import PoolSideView from "./PoolSideView";
    import FluidList from "../models/FluidList";
    import ViscosityPlot from "./ViscosityPlot";

    export default {
        name: "PhysicsSimulator",
        components: {ViscosityPlot, PoolSideView},
        data: () => ({
            // constants
            minObjectMass: 1,
            maxObjectMass: 1000,
            minObjectDiameter: 1,
            maxObjectDiameter: 100,

            // variables
            objectMass: 800,
            objectDiameter: 15,
            selectedFluid: FluidList[0].id,
            fluidList: FluidList,
            viscosityPlotWidth: 0,
            viscosityPlotData: [],
        }),
        mounted() {
            this.viscosityPlotWidth = document.getElementById("viscosity-plot-wrapper").offsetWidth;
        },
        methods: {
            plotDataHandler(plotData) {
                this.viscosityPlotData = plotData;
            }
        }
    }
</script>

<style scoped>
    .v-subheader {
        padding: 0;
    }
</style>
