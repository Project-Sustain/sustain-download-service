import {AlertColor} from "@mui/material";
import React from "react";

export interface dataEntryType {
    [name: string]: stateType
}

export interface stateType {
    name: string,
    GISJOIN: string,
    collections_supported: collection[],
    datasets: string[],
    counties: countyType[]
}

export interface collection {
    collection: string,
    color: any,
    fieldMetadata: any[],
    label: string,
    level: string,
    temporal: any
}

export interface countyType {
    GISJOIN: string,
    name: string
}

export interface dataType {
    stateData: dataEntryType,
    currentState: stateType,
    currentCounty: countyType
}

export interface dataManagementType {
    handleStateChange: (stateName: string) => void,
    handleCountyCounty: (countyName: string) => void
}

export interface alertStateType {
    open: boolean,
    text: string,
    severity: AlertColor
}

export type setAlertType = (open: boolean, text: string, severity: AlertColor) => void;

export interface alertType {
    alertState: alertStateType,
    setAlertState: React.Dispatch<React.SetStateAction<alertStateType>>
}

export interface datasetStateType {
    granularity: granularityType,
    setGranularity: (value: granularityType) => void,
    filteredDatasets: string[],
    setFilteredDatasets: (value: string[]) => void,
    filtering: boolean,
    setFiltering: (value: boolean) => void
}

export interface filterType {
    stateFilterType: number,
    setStateFilterType: (value: number) => void,
    setStatesMatchingSearch: (value: string[]) => void
}

export type granularityType = "county" | "state";
