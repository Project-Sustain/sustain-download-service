import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import counties from '../json/counties.json'
import { useEffect } from "react";

const useStyles = makeStyles({
    root: {
        padding: "25px"
    }
});

export default React.memo(function DownloadSection() {
    const classes = useStyles();
    const countiesSorted = counties.sort((countyA, countyB) => Number(countyA.GISJOIN.substring(1, countyA.GISJOIN.length)) - Number(countyB.GISJOIN.substring(1, countyB.GISJOIN.length)));
    const [selectedCounty, setSelectedCounty] = useState(countiesSorted[0]);
    const [menumetadata, setMenumetadata] = useState([] as any[])
    const [selectedDataset, setSelectedDataset] = useState({} as any);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Project-Sustain/aperture-client/master/src/json/menumetadata.json').then(r => r.json())
            .then(data => { setMenumetadata(data); setSelectedDataset(data[0]) })
            .catch(e => console.error("Booo"))
    }, [])


    if(!menumetadata.length){
        return null;
    }

    return <div className={classes.root}>
        <Autocomplete
            options={countiesSorted}
            value={selectedCounty}
            onChange={(event, newValue) => {
                if (newValue) {
                    setSelectedCounty(newValue)
                }
            }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a county"
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />

        <br/>

        <Autocomplete
            options={menumetadata}
            value={selectedDataset}
            onChange={(event, newValue) => {
                if (newValue) {
                    setSelectedDataset(newValue)
                }
            }}
            autoHighlight
            getOptionLabel={(option) => option.label ?? option.collection}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a dataset"
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    </div>
});