import {gisJoinCountyNames, gisJoinStateNames} from "./gisInfo";
import {countyObjType, stateType} from "./types";

export function getStateName(GISJOIN: String) {
    for(const gis of gisJoinStateNames) {
        if(gis.GISJOIN === GISJOIN) {
            return gis.name;
        }
    }
    return "";
}

export function formatDatasetName(datasets: string[]) {
    let newDatasets: string[] = [];
    datasets.forEach((dataset) =>  {
        let newDataset = dataset.replace(/_/g, " ");
        newDataset = capitalizeFirstLetter(newDataset);
        newDatasets.push(newDataset);
    });
    return newDatasets;
}

export function serverNameToClientName(dataset: string) {
    let newDataset = dataset.replace(/_/g, " ");
    return capitalizeFirstLetter(newDataset);
}

export function clientNameToServerName(clientName: string) {
    let serverName = clientName.replace(/ /g, "_");
    return serverName.toLowerCase();
}

export function capitalizeFirstLetter(str: any) {
    if (str === null || str.length === 0) {
        return "";
    }
    str = str.split(" ");
    for (let i = 0, x = str.length; i < x; i++) {
        if (str[i] === null || str[i].length <= 2) {
            continue;
        }
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
}

export function lowercaseArray(array: string[]) {
    let lowercaseMatches = [];
    for (let i = 0; i < array.length; i++) {
        const words = array[i].split(" ");
        for(let j = 0; j < words.length; j++) {
            words[j] = words[j][0].toLowerCase() + words[j].substr(1);
        }
        lowercaseMatches.push(words.join(" "));
    }
    return lowercaseMatches;
}

export function capitalizeArray(matches: string[]) {
    let capitalizedMatches = [];
    for (let i = 0; i < matches.length; i++) {
        const words = matches[i].split(" ");
        for(let j = 0; j < words.length; j++) {
            words[j] = words[j][0].toUpperCase() + words[j].substr(1);
        }
        capitalizedMatches.push(words.join(" "));
    }
    return capitalizedMatches;
}

function findTheComma(nameAsArray: string[]) {
    let spot = 0;
    nameAsArray.forEach((word: string, index) => {
        if(word.charAt(word.length-1) === ",") {
            spot = index+1;
        }
    })
    return spot;
}

function extractStateCountyName(nameAsArray: string[]) {
    const indexOfStateName = findTheComma(nameAsArray);
    if(indexOfStateName !== 0) {
        const stateName = nameAsArray.splice(indexOfStateName, nameAsArray.length-1).join(" ");
        let tempCountyName = nameAsArray.splice(0, indexOfStateName).join(" ");
        const countyName = tempCountyName.substr(0, tempCountyName.length-1);
        return [stateName, countyName];
    }
    return ["", ""];
}

export function buildCountyMap(serverResponse: stateType) {
    let masterMap = {...serverResponse};
    gisJoinCountyNames.forEach((county: countyObjType) => {
        const nameAsArray = county.name.split(" ");
        const names = extractStateCountyName(nameAsArray)
        const stateName = names[0];
        if(Object.keys(masterMap).includes(stateName)) {
            const countyName = names[1];
            const GISJOIN = county.GISJOIN;
            let countyObj = {
                GISJOIN: GISJOIN,
                name: countyName
            };
            masterMap[stateName].counties.push(countyObj);
        }
    });
    return masterMap;
}

export function alertTimeout(setAlertState: (arg0: { open: boolean; text: string; severity: string; }) => void) {
    setTimeout(function() {
        setAlertState({
            open: false,
            text: "",
            severity: ""
        });
    }, 3000);
}

export const unSelectedState = "#eee";
export const selectedState = "#458AB9";
export const chosenState = "#2DA661";