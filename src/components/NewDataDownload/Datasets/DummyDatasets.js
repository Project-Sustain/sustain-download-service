import {statesArray} from "../States/StateInfo";
import {countyMap} from "../Counties/CountyMapping";

const dummyDatasets = ["Heatwaves", "SVI County", "Neon Barometric Pressure", "Neon Soil Temperature", "Maximum Heatwave Temperature",
                        "Neon 2d Wind", "Neon Precipitation", "National Risk Index", "Electrical Substations", "Electrical Transmission Lines", "Minimum Heatwave Temperature",
                        "Neon Bio Temperature", "SVI Tract", "Median Household Income County", "Median Household Income Tract", "Neon Single Asp Air", "Neon Triple Asp Air",
                        "Power Plants", "Natural Gas Pipelines", "Dams", "Hospitals", "Urgent Care Facilities", "Fire Stations", "Public Schools", "Flood Zones", "Covid-19"];

export const stateToDatasetMapping = associateDatasetsAndStates();
export const stateCountyDatasetMapping = associateStateAndCountyDatasets();

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

function associateStateAndCountyDatasets() {
    let stateCountyDatasetMapping = {};
    for (const [state, counties] of Object.entries(countyMap)) {
        let individualStateObject = {};
        individualStateObject.datasets = getDatasets();
        let countyObject = {};
        for (const county in counties) {
            countyObject[counties[county]] = getDatasets(individualStateObject.datasets);
        }
        individualStateObject.counties = countyObject;
        stateCountyDatasetMapping[state] = individualStateObject;
    }
    console.log({stateCountyDatasetMapping})
    return stateCountyDatasetMapping;
}

function getDatasets(set) {
    let theseDatasets = [];
    if (set) {
        const datasets = generateRandomDatasetArray(set.length);
        for (let i = 0; i < datasets.length; i++) {
            theseDatasets.push(set[datasets[i]]);
        }
    }
    else {
        const datasets = generateRandomDatasetArray();
        for (let i = 0; i < datasets.length; i++) {
            theseDatasets.push(dummyDatasets[datasets[i]]);
        }
    }
    return theseDatasets;
}

function generateRandomDatasetArray(setLength) {
    const length = setLength ? setLength : getRandomInt(7, dummyDatasets.length);
    const indexArray = Array.from({length: length}, () => Math.floor(Math.random() * length));
    return [...new Set(indexArray)];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}