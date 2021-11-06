import {useEffect, useState} from "react";
import {mongoQuery} from "../../../library/Download";
import {alertTimeout, serverNameToClientName, getStateName} from "./utils";
import {buildCountyMap} from "./utils";
import {countyObjType, individualStateType, stateType} from "./types";

export function useStateSelection() {
    const [stateData, setStateData] = useState({} as any);
    const [currentState, setCurrentState] = useState({} as any);
    const [currentCounty, setCurrentCounty] = useState({} as any);
    const [alertState, setAlertState] = useState({
        open: false,
        text: "",
        severity: ""
    });

    console.log({stateData})

    // useEffect(() => {
    //     if(dataHasLoaded()) {
    //         for(const [key, value] of Object.entries(stateData)) {
    //             let datasets = [] as string[];
    //             // @ts-ignore
    //             const serverCollections = value.collections_supported;
    //             let newServerCollectionArray = [] as any;
    //             // @ts-ignore
    //             value.collections_supported = [];
    //             serverCollections.forEach((serverCollection: any) => {
    //                 apertureData.forEach((apertureCollection: any) => {
    //                     if(serverCollection === apertureCollection.collection) {
    //                         datasets.push(serverNameToClientName(serverCollection));
    //                         newServerCollectionArray.push(apertureCollection);
    //                     }
    //                 });
    //             });
    //             if(newServerCollectionArray.length !== 0) {
    //                 // @ts-ignore
    //                 value.collections_supported = newServerCollectionArray;
    //                 // @ts-ignore
    //                 value.datasets = datasets;
    //             }
    //         }
    //     }
    // }, [stateData, apertureData])

    // useEffect(() => {
    //     fetch('https://raw.githubusercontent.com/Project-Sustain/aperture-client/master/src/json/menumetadata.json').then(r => r.json())
    //         .then(data => { setApertureData(data); })
    //         .catch(e => console.error("Error fetching Aperture data"))
    // }, []);

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

                setStateData(buildCountyMap(masterMap));
                setCurrentState(masterMap["Colorado"]);
                setCurrentCounty(masterMap["Colorado"].counties[0]);
            }

            else {
                console.log("API call failure, data unavailable")
            }


            // async function getMongoData(apertureData: any) {
            //     const serverResponse = await mongoQuery("state_gis_join_metadata", []);
            //     let masterMap = {} as any;
            //     for (const key of serverResponse) {
            //         masterMap[getStateName(key.gis_join)] = {
            //             name: getStateName(key.gis_join),
            //             GISJOIN: key.gis_join,
            //             collections_supported: key.collections_supported,
            //             datasets: [],
            //             counties: []
            //         }
            //     }
            //     for(const [key, value] of Object.entries(masterMap)) {
            //         // @ts-ignore
            //         const serverCollections = value.collections_supported;
            //         let datasets = [] as string[];
            //         let newServerCollection = [] as any;
            //         // @ts-ignore
            //         value.collections_supported = [];
            //         serverCollections.forEach((serverCollection: any) => {
            //             apertureData.forEach((apertureCollection: any) => {
            //                 if(serverCollection === apertureCollection.collection) {
            //                     datasets.push(serverNameToClientName(serverCollection));
            //                     newServerCollection.push(apertureCollection);
            //                 }
            //             });
            //         });
            //         if(newServerCollection.length !== 0) {
            //             // @ts-ignore
            //             value.collections_supported = newServerCollection;
            //             // @ts-ignore
            //             value.datasets = datasets;
            //         }
            //     }
            //     setStateData(buildCountyMap(masterMap));
            //     setCurrentState(masterMap["Colorado"]);
            //     setCurrentCounty(masterMap["Colorado"].counties[0]);
            //
            // }
        })()
    }, []);

    const data = {stateData, currentState, currentCounty, alertState, setAlertState};
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