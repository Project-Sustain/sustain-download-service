import {AlertColor} from "@mui/material";
import React from "react";

export interface countyType {
    GISJOIN: string,
    name: string
}

export interface dataEntryType {
    [name: string]: stateType
}

export interface collection {
    collection: string,
    color: any,
    fieldMetadata: any[],
    label: string,
    level: string
}

export interface stateType {
    name: string,
    GISJOIN: string,
    collections_supported: collection[],
    datasets: string[],
    counties: countyType[]
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

export interface alertType {
    alertState: alertStateType,
    setAlertState: React.Dispatch<React.SetStateAction<alertStateType>>
}

export interface alertStateType {
    open: boolean,
    text: string,
    severity: AlertColor
}
