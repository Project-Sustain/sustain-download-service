import React, {useEffect, useState} from "react";
import {mongoQuery} from "../../library/Download";
import {formatDatasetName, getStateName} from "./Utils/utils";
import {countyMap} from "./Counties/CountyMapping";

export function useStateSelection() {
    const [stateToDatasets, setStateToDatasets] = useState();
    const [selectedState, setSelectedState] = useState("Colorado");
    const [counties, setCounties] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState();
    const [stateDatasets, setStateDatasets] = useState([]);

    const stateCountyData = {selectedState, counties, selectedCounty, stateDatasets};

    const context = {stateToDatasets, setSelectedState, setCounties, setSelectedCounty, setStateDatasets}

    useEffect(() => {
        (async () => {
            const sAvailability = await mongoQuery("state_gis_join_metadata", []);
            let masterMap = {};
            for(const key of sAvailability) {
                // @ts-ignore
                masterMap[getStateName(key.gis_join)] = {
                    GISJOIN: key.gis_join,
                    collections_supported: key.collections_supported,
                    datasets: formatDatasetName(key.collections_supported)
                }
            }
            // @ts-ignore
            setStateToDatasets(masterMap);
            // @ts-ignore
            setStateDatasets(masterMap[`${selectedState}`].datasets);

            // @ts-ignore
            const counties = countyMap[`${selectedState}`];
            setCounties(counties);
            // @ts-ignore
            setSelectedCounty(counties[0]);
        })()
    }, []);

    const stateFunctions = {
        handleStateChange: (stateName: any) => handleStateChange(stateName, context)
    }

    return [stateCountyData, stateFunctions, setSelectedState];
}

function handleStateChange(stateName: any, context: any) {
    const {stateToDatasets, setSelectedState, setCounties, setSelectedCounty, setStateDatasets} = context;
    setSelectedState(stateName);
    // @ts-ignore
    setStateDatasets(stateToDatasets[`${stateName}`].datasets);
    // @ts-ignore
    setCounties(countyMap[`${stateName}`]);
    // @ts-ignore
    setSelectedCounty(countyMap[`${stateName}`][0]);
}
