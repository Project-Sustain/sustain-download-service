import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';
import DownloadSection from "./DownloadSection";

const useStyles = makeStyles({
    main: {
        
    },
    downloadSection: {
        margin: "40px"
    }
});

export default function Main() {
    const classes = useStyles();
    return <Container maxWidth="md" className={classes.main}>
        <Paper className={classes.downloadSection}>
            <DownloadSection/>
        </Paper>
    </Container>
}