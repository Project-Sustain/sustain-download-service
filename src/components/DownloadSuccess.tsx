import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, IconButton, Tooltip } from '@material-ui/core';
import DownloadResult from "../types/DownloadResult";
import GetAppIcon from '@material-ui/icons/GetApp';
import JSZip from "jszip";

const useStyles = makeStyles((theme) => ({
    progress: {
        height: "75px !important",
        width: "75px !important"
    },
}));

interface downloadSuccessProps {
    downloadResult: DownloadResult
}

export default function DownloadSuccess({ downloadResult }: downloadSuccessProps) {
    const classes = useStyles();

    const exportAndDownloadData = () => {
        var zip = new JSZip();
        zip.file('data.json', JSON.stringify(downloadResult.data, null, 4))
        downloadResult.geometry && zip.file('linkedGeometry.json', JSON.stringify(downloadResult.geometry, null, 4))
        downloadResult.meta.fieldLabels && zip.file('fieldLabels.json', JSON.stringify(downloadResult.meta.fieldLabels, null, 4))
        zip.file('README.txt', `
        This package, which includes data for the collection "${downloadResult.meta.collectionName}" for the county "${downloadResult.meta.countyName}" contains the following files:


        README -- This file

        data.json -- JSON file including the data requested

        ${downloadResult.geometry ? `linkedGeometry.json -- GeoJSON feature file which includes geospatial information about data within data.json.
        Data between the files can be linked using the "${downloadResult.meta.joinField}" field, which exists at the top level of each entry in both files.` : ''}

        ${downloadResult.meta.fieldLabels ? `fieldLabels.json -- JSON array including field name label data.` : ''}
        `)

        zip.generateAsync({
            type: "blob"
        }).then(function (contentBlob) {
            const uriContent = URL.createObjectURL(contentBlob);
            const a = document.createElement('a');
            a.setAttribute('href', uriContent)
            a.setAttribute('download', `${downloadResult.meta.collectionName}.${downloadResult.meta.countyName}.zip`.replaceAll(' ', '_').replaceAll(',', ''));
            a.style.display = 'none'
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    return <div>
        <Typography variant="h5" gutterBottom>Download Successful</Typography>
        <Tooltip title={<Typography>Download your data to your computer.</Typography>}><IconButton onClick={exportAndDownloadData}>
            <GetAppIcon />
        </IconButton></Tooltip>
    </div>
}