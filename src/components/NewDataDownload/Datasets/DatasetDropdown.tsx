import React from "react";
import {FormControl, InputLabel, Select} from "@material-ui/core";
import {stateToDatasetMapping, stateCountyDatasetMapping} from "./DummyDatasets";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../global/GlobalTheme";

const useStyles = makeStyles({
    root: {
        margin: theme.spacing(1),
        width: "100%"
    },
});

export default function DatasetDropdown(props:any) {
    const classes = useStyles();
    // @ts-ignore
    const datasets = stateToDatasetMapping[`${props.selectedState.toLowerCase()}`];

    function getOptions() {
        if(datasets) {
            let allOptions:any = [];
            datasets.forEach((option: any, index: any) => {
                allOptions.push(<option key={index} value={index}>{option}</option>)
            })
            return allOptions;
        }
    }

    return (
        <div>
            <FormControl variant="outlined" className={classes.root}>
                <InputLabel>Download a Dataset</InputLabel>
                <Select
                    native
                    label="Download a Dataset"
                >
                    {getOptions()}
                </Select>
            </FormControl>
        </div>
    );
}