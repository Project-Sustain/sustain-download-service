import {statesArray} from "../States/StateInfo";
import {countyMap} from "../Counties/CountyMapping";

const dummyDatasets = ["Heatwaves", "SVI County", "Neon Barometric Pressure", "Neon Soil Temperature", "Maximum Heatwave Temperature",
                        "Neon 2d Wind", "Neon Precipitation", "National Risk Index", "Electrical Substations", "Electrical Transmission Lines", "Minimum Heatwave Temperature",
                        "Neon Bio Temperature", "SVI Tract", "Median Household Income County", "Median Household Income Tract", "Neon Single Asp Air", "Neon Triple Asp Air",
                        "Power Plants", "Natural Gas Pipelines", "Dams", "Hospitals", "Urgent Care Facilities", "Fire Stations", "Public Schools", "Flood Zones", "Covid-19"];

export const stateToDatasetMapping = associateDatasetsAndStates();

function associateDatasetsAndStates() {
    let stateDatasetMapping = {};
    console.log({countyMap})
    for (const [state, counties] of Object.entries(countyMap)) {
        console.log({state})
        console.log({counties})
    }

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
    const length = getRandomInt(7, dummyDatasets.length);
    const indexArray = Array.from({length: length}, () => Math.floor(Math.random() * length));
    return [...new Set(indexArray)];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}