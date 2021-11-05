import {useEffect, useState} from "react";
import {mongoQuery} from "../../../library/Download";
import {alertTimeout, getStateName} from "./utils";
import {buildCountyMap} from "./utils";
import {countyObjType, individualStateType, stateType} from "./types";

export function useStateSelection() {
    const [stateData, setStateData] = useState({} as any);
    const [currentState, setCurrentState] = useState({} as any);
    const [currentCounty, setCurrentCounty] = useState({} as any);
    const [apertureData, setApertureData] = useState({} as any);
    const [currentDatasets, setCurrentDatasets] = useState([] as any);
    const [alertState, setAlertState] = useState({
        open: false,
        text: "",
        severity: ""
    });

    console.log({apertureData})
    console.log({stateData})

    function dataHasLoaded() {
        return Object.keys(apertureData).length !== 0 && Object.keys(stateData).length !== 0;
    }

    useEffect(() => {
        if(dataHasLoaded()) {
            let newMasterData = Object.assign({}, stateData);
            for(const [key, value] of Object.entries(newMasterData)) {
                // @ts-ignore
                const serverCollections = value.collections_supported;
                let newServerCollectionArray = [] as any;
                // @ts-ignore
                value.collections_supported = [];
                serverCollections.forEach((serverCollection: any) => {
                    apertureData.forEach((apertureCollection: any) => {
                        if(serverCollection === apertureCollection.collection) {
                            newServerCollectionArray.push(apertureCollection);
                        }
                    });
                });
                if(newServerCollectionArray.length !== 0) {
                    // @ts-ignore
                    value.collections_supported = newServerCollectionArray;
                }

            }
            console.log({newMasterData})
        }
    })

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Project-Sustain/aperture-client/master/src/json/menumetadata.json').then(r => r.json())
            .then(data => { setApertureData(data); })
            .catch(e => console.error("Error fetching Aperture data"))
    }, []);

    useEffect(() => {
        (async () => {
            const serverResponse = await mongoQuery("state_gis_join_metadata", []);
            let masterMap = {} as any;
            for(const key of serverResponse) {
                masterMap[getStateName(key.gis_join)] = {
                    name: getStateName(key.gis_join),
                    GISJOIN: key.gis_join,
                    collections_supported: key.collections_supported,
                    counties: []
                }
            }
            setStateData(buildCountyMap(masterMap));
            setCurrentState(masterMap["Colorado"]);
            setCurrentCounty(masterMap["Colorado"].counties[0]);
        })()
    }, []);

    const data = {stateData, apertureData, currentState, currentCounty, alertState, setAlertState};
    const dataManagement = {
        handleStateChange: (stateName: any) => handleStateChange(stateName),
        handleCountyCounty: (countyName: any) => handleCountyCounty(countyName)
    };

    function handleStateChange(stateName: any) {
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

    function handleCountyCounty(countyName: any) {
        currentState.counties.forEach((county: any) => {
            if (county.name === countyName) {
                setCurrentCounty(county);
            }
        })
    }

    return [data, dataManagement];
}