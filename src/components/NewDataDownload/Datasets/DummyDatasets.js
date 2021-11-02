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

export const gisJoinStateNames = [
    {
        "GISJOIN": "G560",
        "name": "Wyoming"
    },
    {
        "GISJOIN": "G350",
        "name": "New Mexico"
    },
    {
        "GISJOIN": "G420",
        "name": "Pennsylvania"
    },
    {
        "GISJOIN": "G390",
        "name": "Ohio"
    },
    {
        "GISJOIN": "G440",
        "name": "Rhode Island"
    },
    {
        "GISJOIN": "G320",
        "name": "Nevada"
    },
    {
        "GISJOIN": "G720",
        "name": "Puerto Rico"
    },
    {
        "GISJOIN": "G490",
        "name": "Utah"
    },
    {
        "GISJOIN": "G380",
        "name": "North Dakota"
    },
    {
        "GISJOIN": "G200",
        "name": "Kansas"
    },
    {
        "GISJOIN": "G310",
        "name": "Nebraska"
    },
    {
        "GISJOIN": "G050",
        "name": "Arkansas"
    },
    {
        "GISJOIN": "G410",
        "name": "Oregon"
    },
    {
        "GISJOIN": "G550",
        "name": "Wisconsin"
    },
    {
        "GISJOIN": "G130",
        "name": "Georgia"
    },
    {
        "GISJOIN": "G360",
        "name": "New York"
    },
    {
        "GISJOIN": "G080",
        "name": "Colorado"
    },
    {
        "GISJOIN": "G400",
        "name": "Oklahoma"
    },
    {
        "GISJOIN": "G100",
        "name": "Delaware"
    },
    {
        "GISJOIN": "G240",
        "name": "Maryland"
    },
    {
        "GISJOIN": "G540",
        "name": "West Virginia"
    },
    {
        "GISJOIN": "G280",
        "name": "Mississippi"
    },
    {
        "GISJOIN": "G090",
        "name": "Connecticut"
    },
    {
        "GISJOIN": "G300",
        "name": "Montana"
    },
    {
        "GISJOIN": "G210",
        "name": "Kentucky"
    },
    {
        "GISJOIN": "G340",
        "name": "New Jersey"
    },
    {
        "GISJOIN": "G330",
        "name": "New Hampshire"
    },
    {
        "GISJOIN": "G010",
        "name": "Alabama"
    },
    {
        "GISJOIN": "G150",
        "name": "Hawaii"
    },
    {
        "GISJOIN": "G290",
        "name": "Missouri"
    },
    {
        "GISJOIN": "G060",
        "name": "California"
    },
    {
        "GISJOIN": "G160",
        "name": "Idaho"
    },
    {
        "GISJOIN": "G460",
        "name": "South Dakota"
    },
    {
        "GISJOIN": "G250",
        "name": "Massachusetts"
    },
    {
        "GISJOIN": "G470",
        "name": "Tennessee"
    },
    {
        "GISJOIN": "G170",
        "name": "Illinois"
    },
    {
        "GISJOIN": "G110",
        "name": "District of Columbia"
    },
    {
        "GISJOIN": "G180",
        "name": "Indiana"
    },
    {
        "GISJOIN": "G500",
        "name": "Vermont"
    },
    {
        "GISJOIN": "G040",
        "name": "Arizona"
    },
    {
        "GISJOIN": "G190",
        "name": "Iowa"
    },
    {
        "GISJOIN": "G530",
        "name": "Washington"
    },
    {
        "GISJOIN": "G260",
        "name": "Michigan"
    },
    {
        "GISJOIN": "G270",
        "name": "Minnesota"
    },
    {
        "GISJOIN": "G450",
        "name": "South Carolina"
    },
    {
        "GISJOIN": "G510",
        "name": "Virginia"
    },
    {
        "GISJOIN": "G230",
        "name": "Maine"
    },
    {
        "GISJOIN": "G370",
        "name": "North Carolina"
    },
    {
        "GISJOIN": "G480",
        "name": "Texas"
    },
    {
        "GISJOIN": "G220",
        "name": "Louisiana"
    },
    {
        "GISJOIN": "G120",
        "name": "Florida"
    },
    {
        "GISJOIN": "G020",
        "name": "Alaska"
    }
]