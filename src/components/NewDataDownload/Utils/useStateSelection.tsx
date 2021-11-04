import {useEffect, useState} from "react";
import {countyMap} from "./CountyMapping";
import {mongoQuery} from "../../../library/Download";
import {formatDatasetName, getStateName} from "./utils";
import {buildCountyMap} from "./utils";
import {countyObjType, individualStateType, stateDatasetType, stateType} from "./types";

export function useStateSelection() {
    //FIXME new state, keep these
    const [stateData, setStateData] = useState({} as stateType);
    const [currentState, setCurrentState] = useState({} as individualStateType);
    const [currentCounty, setCurrentCounty] = useState({} as countyObjType);

    //FIXME old state idea, remove these
    const [stateToDatasets, setStateToDatasets] = useState({} as stateDatasetType);
    const [selectedState, setSelectedState] = useState("" as string);
    const [counties, setCounties] = useState([] as string[]);
    const [stateDatasets, setStateDatasets] = useState([] as string[]);
    const [selectedCounty, setSelectedCounty] = useState("" as string);


    useEffect(() => {
        (async () => {
            const serverResponse = await mongoQuery("state_gis_join_metadata", []);
            let masterMap = {} as stateType;
            for(const key of serverResponse) {
                masterMap[getStateName(key.gis_join)] = {
                    name: getStateName(key.gis_join),
                    GISJOIN: key.gis_join,
                    collections_supported: key.collections_supported,
                    datasets: formatDatasetName(key.collections_supported),
                    counties: []
                }
            }
            setStateData(buildCountyMap(masterMap));
            setCurrentState(masterMap["Colorado"]);
            setCurrentCounty(masterMap["Colorado"].counties[0]);


            //FIXME old
            setStateToDatasets(masterMap);
            setSelectedState("Colorado");
            setStateDatasets(masterMap["Colorado"].datasets);
            setCounties(countyMap["Colorado"]);
            setSelectedCounty(countyMap["Colorado"][0]);
        })()
    }, []);

    const data = {stateToDatasets, selectedState, counties, selectedCounty, stateDatasets, stateData, currentState, currentCounty};
    const dataManagement = {
        handleStateChange: (stateName: any) => handleStateChange(stateName),
        handleCountyCounty: (countyName: any) => handleCountyCounty(countyName)
    };

    function handleStateChange(stateName: any) {
        //FIXME New way of handling this
        if(stateData[`${stateName}`]) {
            setCurrentState(stateData[`${stateName}`]);
            setCurrentCounty(stateData[`${stateName}`].counties[0]);
        }

        //FIXME old
        setSelectedState(stateName);
        if(stateToDatasets[`${stateName}`]) {
            setStateDatasets(stateToDatasets[`${stateName}`].datasets);
        }
        else {
            console.log("No server data for " + stateName);
            setStateDatasets([]);
        }
        setCounties(countyMap[`${stateName}`]);
        setSelectedCounty(countyMap[`${stateName}`][0]);
    }

    function handleCountyCounty(countyName: any) {
        currentState.counties.forEach((county) => {
            if(county.name === countyName) {
                setCurrentCounty(county);
            }
        })
        setSelectedCounty(countyName); //FIXME old
    }

    return [data, dataManagement];
}