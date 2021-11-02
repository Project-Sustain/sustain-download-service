import React, {useState} from "react";
import {countyMap} from "./Counties/CountyMapping";

interface stateDatasetType {
    name: innerObject
}

interface innerObject {
    GISJOIN: string,
    collections_supported: string[],
    datasets: string[]
}

export function useStateSelection() {
    const [stateToDatasets, setStateToDatasets] = useState({} as stateDatasetType);
    const [selectedState, setSelectedState] = useState("" as string);
    const [counties, setCounties] = useState([] as string[]);
    const [selectedCounty, setSelectedCounty] = useState("" as string);
    const [stateDatasets, setStateDatasets] = useState([] as string[]);


    console.log({stateToDatasets})

    const data = {selectedState, counties, selectedCounty, stateDatasets};
    const context = {setStateToDatasets, stateToDatasets, setSelectedState, setCounties, setSelectedCounty, setStateDatasets};
    const dataManagement = {
        handleStateChange: (stateName: any) => handleStateChange(stateName, context),
        updateSelectedCounty: (countyName: any) => updateSelectedCounty(countyName, setSelectedCounty),
        initialize: (masterMap: any) => initialize(masterMap, context),
    };

    return [data, dataManagement];
}

function handleStateChange(stateName: any, context: any) {
    const {stateToDatasets, setSelectedState, setCounties, setSelectedCounty, setStateDatasets} = context;
    setSelectedState(stateName);
    console.log({stateToDatasets})
    // @ts-ignore
    setStateDatasets(stateToDatasets[`${stateName}`].datasets);
    // @ts-ignore
    setCounties(countyMap[`${stateName}`]);
    // @ts-ignore
    setSelectedCounty(countyMap[`${stateName}`][0]);
}

function updateSelectedCounty(countyName: any, setSelectedCounty: any) {
    setSelectedCounty(countyName);
}

function initialize(masterMap: any, context:any) {
    const {setStateToDatasets, setSelectedState, setCounties, setSelectedCounty, setStateDatasets} = context;
    setStateToDatasets(masterMap);
    setSelectedState("Colorado");
    setStateDatasets(masterMap["Colorado"].datasets);
    // @ts-ignore
    setCounties(countyMap["Colorado"]);
    // @ts-ignore
    setSelectedCounty(countyMap["Colorado"][0]);
}
