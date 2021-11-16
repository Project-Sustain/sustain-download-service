import {gisStateCounty} from "../../../library/gisInfo";
import JSZip from "jszip";

export function serverNameToClientName(dataset: any) {
    let newDataset = dataset.replace(/_/g, " ");
    return capitalizeFirstLetter(newDataset);
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

export function buildStateCollections(mongoCollections: any, apertureData: any) {
    let collections = [] as any;
    let datasets = [] as string[];
    mongoCollections.forEach((mongoCollection: string) => {
        apertureData.forEach((apertureCollection: any) => {
            if(mongoCollection === apertureCollection.collection) {
                collections.push(apertureCollection);
                datasets.push(serverNameToClientName(mongoCollection));
            }
        });
    });
    return [collections, datasets];
}

export function getStateName(GISJOIN: string) {
    const state = gisStateCounty.states.find(state => state.GISJOIN === GISJOIN);
    if(state) return state.name;
    else return "";
}

export function getCounties(stateName: string) {
    const state = gisStateCounty.states.find(state => state.name === stateName);
    if(state) return state.counties;
    else return [];
}

export function alertTimeout(setAlertState: (arg0: { open: boolean; text: string; severity: string; }) => void) {
    setTimeout(function() {
        setAlertState({
            open: false,
            text: "",
            severity: ""
        });
    }, 4500);
}

export const exportAndDownloadData = (downloadResult: any) => {
    var zip = new JSZip();
    zip.file('data.json', JSON.stringify(downloadResult.data, null, 4))
    downloadResult.geometry && zip.file('linkedGeometry.json', JSON.stringify(downloadResult.geometry, null, 4))
    downloadResult.meta.fieldLabels && zip.file('fieldLabels.json', JSON.stringify(downloadResult.meta.fieldLabels, null, 4))
    zip.file('README.txt', `
        This package, which includes data for the collection "${downloadResult.meta.collectionName}" for the region "${downloadResult.meta.regionName}" contains the following files:


        README -- This file

        data.json -- JSON file including the data requested

        ${downloadResult.geometry ? `linkedGeometry.json -- GeoJSON feature file which includes geospatial information about data within data.json.
        Data between the files can be linked using the "${downloadResult.meta.joinField}" field, which exists at the top level of each entry in both files.` : ''}

        ${downloadResult.meta.fieldLabels ? `fieldLabels.json -- JSON array including field name label data.` : ''}
        `)

    zip.generateAsync({
        type: "blob"
    }).then(function (contentBlob) {
        const uriContent = URL.createObjectURL(contentBlob);
        const a = document.createElement('a');
        a.setAttribute('href', uriContent)
        a.setAttribute('download', `${downloadResult.meta.collectionName}.${downloadResult.meta.regionName}.zip`.replaceAll(' ', '_').replaceAll(',', ''));
        a.style.display = 'none'
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}
