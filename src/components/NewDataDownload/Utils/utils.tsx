import {gisStateCounty} from "../../../library/gisInfo";
import JSZip from "jszip";
import {collection} from "./types";

export function serverNameToClientName(dataset: any) {
    let newDataset = dataset.replace(/_/g, " ");
    return capitalizeFirstLetter(newDataset);
}

function capitalizeFirstLetter(str: any) {
    if(str === null || str.length === 0) return "";
    return str.split(" ").map((word: string) => word.charAt(0).toUpperCase() + word.substr(1)).join(" ");
}

export function buildAdditionalCollections(mongoData: any, apertureData: any) {
    let allMongoCollections = new Set();
    mongoData.forEach((state: any) => {
        state.collections_supported.forEach((collection: string) => {
            allMongoCollections.add(collection);
        });
    });
    return apertureData.filter((apertureCollection: collection) => !allMongoCollections.has(apertureCollection.collection));
}

export function buildCollections(mongoCollections: any, apertureData: any) {
    function getApertureData(mongoCollection: string) {
        return apertureData.find((apertureCollection: collection) => apertureCollection.collection === mongoCollection);
    }
    const collections = mongoCollections.map((mongoCollection: string) => getApertureData(mongoCollection));
    return collections.filter((collection: collection) => collection !== undefined);
}

export function getStateName(GISJOIN: string) {
    const state = gisStateCounty.states.find(state => state.GISJOIN === GISJOIN);
    return state ? state.name : "";
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
    let zip = new JSZip();
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
