<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="8">
                    <PoolSideView></PoolSideView>
                </v-col>
                <v-col cols="4">
                    <v-card>
                        <v-card-title>Simulator Properties</v-card-title>
                        <v-card-text>
                                <v-row>
                                    <v-col cols="4">
                                        <v-subheader>Object mass</v-subheader>
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
                                    <v-col cols="4">
                                        <v-subheader>Object diameter</v-subheader>
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
                                    <v-col cols="4">
                                        <v-subheader>Fluid type</v-subheader>
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

    export default {
        name: "PhysicsSimulator",
        components: {PoolSideView},
        data: () => ({
            objectMass: 10,
            objectDiameter: 10,
            selectedFluid: FluidList[0],
            fluidList: FluidList,
        }),
    }
</script>

<style scoped>

</style>
