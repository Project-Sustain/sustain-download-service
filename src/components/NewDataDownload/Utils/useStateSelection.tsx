import {useEffect, useState} from "react";
import {mongoQuery} from "../../../library/Download";
import {alertTimeout, serverNameToClientName, getStateName} from "./utils";
import {buildCountyMap} from "./utils";
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
                for (const key of mongoData) {
                    const collectionsAndDatasets = buildStateCollections(key.collections_supported, apertureData);
                    masterMap[getStateName(key.gis_join)] = {
                        name: getStateName(key.gis_join),
                        GISJOIN: key.gis_join,
                        collections_supported: collectionsAndDatasets[0],
                        datasets: collectionsAndDatasets[1],
                        counties: []
                    }
                }
                const finalMapping = buildCountyMap(masterMap);
                setStateData(finalMapping);
                setCurrentState(finalMapping["Colorado"]);
                setCurrentCounty(finalMapping["Colorado"].counties[0]);
            }

            else {
                console.log("API call failure, data unavailable")
            }
        })()
    }, []);

    function buildStateCollections(mongoCollections: any, apertureData: any) {
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

    const data = {stateData, currentState, currentCounty, alertState, setAlertState};
    const dataManagement = {
        handleStateChange: (stateName: any) => handleStateChange(stateName),
        handleCountyCounty: (countyName: any) => handleCountyCounty(countyName)
    };

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

    return [data, dataManagement];
}