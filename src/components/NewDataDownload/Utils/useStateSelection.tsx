import {useEffect, useState} from "react";
import {mongoQuery} from "../../../library/Download";
import {getStateName} from "./utils";
import {buildCountyMap} from "./utils";
import {countyObjType, individualStateType, stateType} from "./types";

export function useStateSelection() {
    const [stateData, setStateData] = useState({} as stateType);
    const [currentState, setCurrentState] = useState({} as individualStateType);
    const [currentCounty, setCurrentCounty] = useState({} as countyObjType);

    console.log({stateData})
    console.log({currentState})
    console.log({currentCounty})

    useEffect(() => {
        (async () => {
            const serverResponse = await mongoQuery("state_gis_join_metadata", []);
            let masterMap = {} as stateType;
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

    const data = {stateData, currentState, currentCounty};
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
            console.log("No server data for " + stateName)
        }
    }

    function handleCountyCounty(countyName: any) {
        if(currentState.counties.length > 0) {
            currentState.counties.forEach((county) => {
                if (county.name === countyName) {
                    setCurrentCounty(county);
                }
            })
        }
        else {
            console.log("No server data for counties in " + currentState.name)
        }
    }

    return [data, dataManagement];
}