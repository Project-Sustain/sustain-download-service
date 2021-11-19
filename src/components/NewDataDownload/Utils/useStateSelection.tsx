import {useEffect, useState} from "react";
import {mongoQuery} from "../../../library/Download";
import {
    buildAdditionalCollections,
    buildCollections,
    getCounties,
    getStateName,
    serverNameToClientName
} from "./utils";
import {
    countyType,
    stateType,
    dataEntryType,
    dataType,
    dataManagementType,
} from "./types";

export function useStateSelection() {
    const [stateData, setStateData] = useState({} as dataEntryType);
    const [currentState, setCurrentState] = useState({} as stateType);
    const [currentCounty, setCurrentCounty] = useState({} as countyType);
    //const [alertState, setAlertState] = useState({open: false, text: "", severity: "info"} as alertStateType);

    useEffect(() => {
        (async () => {
            const apertureData = await fetch('https://raw.githubusercontent.com/Project-Sustain/aperture-client/master/src/json/menumetadata.json').then(r => r.json());
            const mongoData = await mongoQuery("state_gis_join_metadata", []);

            if(apertureData && mongoData) {
                let masterMap = {} as any;
                const additionalCollections = buildAdditionalCollections(mongoData, apertureData);
                for (const key of mongoData) {
                    const stateName = getStateName(key.gis_join);
                    const collections = buildCollections(key.collections_supported, apertureData).concat(additionalCollections);
                    const counties = getCounties(stateName);
                    const datasets = collections.map((collection: any) => collection.label ? collection.label : serverNameToClientName(collection.collection));
                    masterMap[stateName] = {
                        name: stateName,
                        GISJOIN: key.gis_join,
                        collections_supported: collections,
                        datasets: datasets,
                        counties: counties
                    }
                }
                setStateData(masterMap);
                setCurrentState(masterMap["Colorado"]);
                setCurrentCounty(masterMap["Colorado"].counties[0]);
            }

            else {
                console.log("API call failure, data unavailable");
            }
        })();
    }, []);

    const data = {stateData, currentState, currentCounty} as dataType;
    const dataManagement = {
        handleStateChange: (stateName: string) => handleStateChange(stateName),
        handleCountyCounty: (countyName: string) => handleCountyCounty(countyName)
    } as dataManagementType;
    //const alert = {alertState, setAlertState} as alertType;

    function handleStateChange(stateName: string) {
        setCurrentState(stateData[`${stateName}`]);
        setCurrentCounty(stateData[`${stateName}`].counties[0]);
    }

    function handleCountyCounty(countyName: string) {
        currentState.counties.forEach((county: countyType) => {
            if (county.name === countyName) {
                setCurrentCounty(county);
            }
        })
    }

    return {data, dataManagement};
}