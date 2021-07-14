import React, { useState } from "react";
import { Container, Grid, Paper, TextField, Typography, Tooltip, Button, Switch } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Util from '../library/apertureUtil'
import ExploreOffIcon from '@material-ui/icons/ExploreOff';
import ExploreIcon from '@material-ui/icons/Explore';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import LinkIcon from '@material-ui/icons/Link';
import { isLinked } from "../library/DatasetUtil";
import { makeStyles } from '@material-ui/core/styles';
import county from "../types/county"

interface downloadSetupProps {
    countiesSorted: county[],
    menumetadata: any[],
    conductDownload: (selectedDataset: any, selectedCounty: county, includeGeospatialData: boolean) => Promise<void>
}

const useStyles = makeStyles({
    tagsContainer: {
        margin: "10px"
    },
    tag: {
        float: "left"
    }
});

export default function DownloadSetup({ countiesSorted, menumetadata, conductDownload }: downloadSetupProps) {
    const classes = useStyles();
    const [includeGeospatialData, setIncludeGeospatialData] = useState(false)
    const [selectedCounty, setSelectedCounty] = useState(countiesSorted[0] as county);
    const [selectedDataset, setSelectedDataset] = useState(menumetadata[0]);

    const getTags = () => {
        let tags = []
        if (selectedDataset.temporal) {
            tags.push(makeTag("This dataset is temporal, and will have multiple records per entry.", <HourglassEmptyIcon />))
        }
        if (isLinked(selectedDataset)) {
            tags.push(makeTag("This dataset does not come with geospatial data by default, this can be changed under the 'include geospatial data' option.", <ExploreOffIcon />))
        }
        else {
            tags.push(makeTag("This dataset will come with geospatial data, and will be packaged as a GeoJSON Feature array.", <ExploreIcon />))
        }
        if (isLinked(selectedDataset) && includeGeospatialData) {
            tags.push(makeTag("A seperate file containing geospatial information as a GeoJSON Feature array will be included.", <LinkIcon />))
        }
        return tags;
    }

    const makeTag = (tooltipContent: string, icon: JSX.Element) => {
        return <Tooltip title={<Typography>{tooltipContent}</Typography>} key={tooltipContent}>
            {icon}
        </Tooltip>
    }

    const renderLinkOption = () => {
        if (!isLinked(selectedDataset)) {
            return null;
        }
        return <>
            <Typography align="left">Include Geospatial Data</Typography>
            <Switch
                color="primary"
                checked={includeGeospatialData}
                onChange={e => setIncludeGeospatialData(e.target.checked)}
            />
        </>
    }

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

        <br />

        <Typography align="left">Tags</Typography>
        <div className={classes.tagsContainer}>
            {getTags()}
        </div>

        <br />

        <Button variant="contained" color="primary" onClick={() => conductDownload(selectedDataset, selectedCounty, includeGeospatialData)}>
            Download Data
        </Button>
    </>
}