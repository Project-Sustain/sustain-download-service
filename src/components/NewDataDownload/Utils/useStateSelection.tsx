import React, {useEffect, useState} from "react";
import {countyMap} from "./CountyMapping";
import {mongoQuery} from "../../../library/Download";
import {formatDatasetName, getStateName} from "./utils";

interface stateDatasetType {
    [name: string]: {
        GISJOIN: string,
        collections_supported: string[],
        datasets: string[]
    }
}

interface dataType {

}

export function useStateSelection() {
    const [stateToDatasets, setStateToDatasets] = useState({} as stateDatasetType);
    const [selectedState, setSelectedState] = useState("" as string);
    const [counties, setCounties] = useState([] as string[]);
    const [selectedCounty, setSelectedCounty] = useState("" as string);
    const [stateDatasets, setStateDatasets] = useState([] as string[]);

    useEffect(() => {
        (async () => {
            const serverResponse = await mongoQuery("state_gis_join_metadata", []);
            let masterMap = {} as stateDatasetType;
            for(const key of serverResponse) {
                masterMap[getStateName(key.gis_join)] = {
                    GISJOIN: key.gis_join,
                    collections_supported: key.collections_supported,
                    datasets: formatDatasetName(key.collections_supported)
                }
            }
            setStateToDatasets(masterMap);
            setSelectedState("Colorado");
            setStateDatasets(masterMap["Colorado"].datasets);
            setCounties(countyMap["Colorado"]);
            setSelectedCounty(countyMap["Colorado"][0]);
        })()
    }, []);

    const data = {stateToDatasets, selectedState, counties, selectedCounty, stateDatasets};
    const dataManagement = {
        handleStateChange: (stateName: any) => handleStateChange(stateName),
        updateSelectedCounty: (countyName: any) => updateSelectedCounty(countyName)
    };

    function handleStateChange(stateName: any) {
        setSelectedState(stateName);
        if(stateToDatasets[`${stateName}`]) {
            setStateDatasets(stateToDatasets[`${stateName}`].datasets);
        }
        else {
            console.log("No server data for " + stateName)
        }
        setCounties(countyMap[`${stateName}`]);
        setSelectedCounty(countyMap[`${stateName}`][0]);
    }

    function updateSelectedCounty(countyName: any) {
        setSelectedCounty(countyName);
    }

    return [data, dataManagement];

}