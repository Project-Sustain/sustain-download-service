import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    progress: {
        height: "75px !important",
        width: "75px !important"
    },
}));

export default function DownloadLoading() {
    const classes = useStyles();

    return <div>
        <Typography variant="h4" gutterBottom>Fetching your data...</Typography>
        <br/>
        <CircularProgress className={classes.progress}/>
    </div>
}