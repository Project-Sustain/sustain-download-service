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

        zip.generateAsync({
            type: "blob"
        }).then(function (contentBlob) {
            const uriContent = URL.createObjectURL(contentBlob);
            const a = document.createElement('a');
            a.setAttribute('href', uriContent)
            a.setAttribute('download', 'MyDownload.zip');
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