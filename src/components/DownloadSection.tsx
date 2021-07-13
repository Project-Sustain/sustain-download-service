import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, TextField, Typography, Tooltip, Button, Switch } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import counties from '../json/counties.json'
import { useEffect } from "react";
import Util from '../library/apertureUtil'
import ExploreOffIcon from '@material-ui/icons/ExploreOff';
import ExploreIcon from '@material-ui/icons/Explore';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

const useStyles = makeStyles({
    root: {
        padding: "25px"
    },
    tagsContainer: {
        margin: "10px"
    },
    tag: {
        float: "left"
    }
});

export default React.memo(function DownloadSection() {
    const classes = useStyles();
    const countiesSorted = counties.sort((countyA, countyB) => Number(countyA.GISJOIN.substring(1, countyA.GISJOIN.length)) - Number(countyB.GISJOIN.substring(1, countyB.GISJOIN.length)));
    const [selectedCounty, setSelectedCounty] = useState(countiesSorted[0]);
    const [menumetadata, setMenumetadata] = useState([] as any[])
    const [selectedDataset, setSelectedDataset] = useState({} as any);
    const [includeGeospatialData, setIncludeGeospatialData] = useState(false)
    

    const isLinked: () => boolean = () => {
        return selectedDataset.level || selectedDataset.linked;
    }

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Project-Sustain/aperture-client/master/src/json/menumetadata.json').then(r => r.json())
            .then(data => { setMenumetadata(data); setSelectedDataset(data[0]) })
            .catch(e => console.error("Booo"))
    }, []);

    const getTags = () => {
        let tags = []
        if (selectedDataset.temporal) {
            tags.push(<Tooltip title="This dataset is temporal, and will have multiple records per entry." key={0}>
                <HourglassEmptyIcon />
            </Tooltip>
            )
        }
        if (isLinked() && !includeGeospatialData) {
            tags.push(<Tooltip title="This dataset does not come with geospatial data by default, this can be changed under the 'include geospatial data' option." key={1}>
                <ExploreOffIcon />
            </Tooltip>
            )
        }
        else {
            tags.push(<Tooltip title="This dataset will come with geospatial data, and will be packaged as a GeoJSON Feature array." key={2}>
                <ExploreIcon />
            </Tooltip>)
        }
        return tags;
    }

    const renderLinkOption = () => {
        return <>
            <Typography align="left">Include Geospatial Data</Typography>
            <Switch 
                color="primary"
                checked={includeGeospatialData}
                onChange={e => setIncludeGeospatialData(e.target.checked)}
            />
        </>
    }

    if (!menumetadata.length) {
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

        <br />

        <Autocomplete
            options={menumetadata}
            value={selectedDataset}
            onChange={(event, newValue) => {
                if (newValue) {
                    setSelectedDataset(newValue)
                }
            }}
            autoHighlight
            getOptionLabel={(option) => option.label ?? Util.cleanUpString(option.collection)}
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

        <br />

        {renderLinkOption()}

        <br/>

        <Typography align="left">Tags</Typography>
        <div className={classes.tagsContainer}>
            {getTags()}
        </div>
        

    </div>
});