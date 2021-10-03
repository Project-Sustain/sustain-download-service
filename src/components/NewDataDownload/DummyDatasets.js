import {statesArray} from "./StateInfo";

const dummyDatasets = ["Heatwaves", "Social Vulnerability Index (SVI)", "Neon Barometric Pressure", "Neon Soil Temperature", "Maximum Heatwave Temperature",
                        "Neon 2d Wind", "Neon Precipitation", "National Risk Index", "Electrical Substations", "Electrical Transmission Lines", "Minimum Heatwave Temperature"];

export const stateToDatasetMapping = associateDatasetsAndStates();

function associateDatasetsAndStates() {
    let stateDatasetMapping = {};

    for(const key of statesArray) {
        const datasets = generateRandomDatasetArray();
        let theseDatasets = [];
        for(let i = 0; i < datasets.length; i++) {
            theseDatasets.push(dummyDatasets[datasets[i]]);
        }
        stateDatasetMapping[key] = theseDatasets;
    }
    return stateDatasetMapping;
}

function generateRandomDatasetArray() {
    const length = getRandomInt(2, 11);
    const indexArray = Array.from({length: length}, () => Math.floor(Math.random() * length));
    const uniqueIndexArray = [...new Set(indexArray)];
    return uniqueIndexArray;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}