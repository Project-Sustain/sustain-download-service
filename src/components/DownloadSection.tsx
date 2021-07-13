import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import counties from '../json/counties.json'

const useStyles = makeStyles({

});

export default function DownloadSection() {
    const classes = useStyles();
    const countiesSorted = counties.sort((countyA, countyB) => Number(countyA.GISJOIN.substring(1, countyA.GISJOIN.length)) - Number(countyB.GISJOIN.substring(1, countyB.GISJOIN.length)));
    const [selectedCounty, setSelectedCounty] = useState(countiesSorted[0]);

    return <>
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
    </>
}