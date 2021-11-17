import {useEffect, useState} from "react";
import {mongoQuery} from "../../../library/Download";
import {
    alertTimeout,
    buildAdditionalCollections,
    buildCollections,
    getCounties,
    getStateName,
    serverNameToClientName
} from "./utils";
import {countyType, stateType, dataEntryType} from "./types";

export function useStateSelection() {
    const [stateData, setStateData] = useState({} as dataEntryType);
    const [currentState, setCurrentState] = useState({} as stateType);
    const [currentCounty, setCurrentCounty] = useState({} as countyType);
    const [alertState, setAlertState] = useState({
        open: false,
        text: "",
        severity: ""
    });

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
                    const datasets = collections.map((collection: any) => serverNameToClientName(collection.collection));
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
                console.log("API call failure, data unavailable")
            }
        })()
    }, []);

    const data = {stateData, currentState, currentCounty};
    const dataManagement = {
        handleStateChange: (stateName: any) => handleStateChange(stateName),
        handleCountyCounty: (countyName: any) => handleCountyCounty(countyName)
    };
    const alert = {alertState, setAlertState};

    function handleStateChange(stateName: string) {
        if(stateData[`${stateName}`]) {
            setCurrentState(stateData[`${stateName}`]);
            setCurrentCounty(stateData[`${stateName}`].counties[0]);
        }
        else {
            setAlertState({
                open: true,
                text: "We are still working on server data for " + stateName + " State",
                severity: "error"
            });
            alertTimeout(setAlertState);
        }
    }

    function handleCountyCounty(countyName: string) {
        currentState.counties.forEach((county: countyType) => {
            if (county.name === countyName) {
                setCurrentCounty(county);
            }
        })
    }

    return [data, dataManagement, alert];
}