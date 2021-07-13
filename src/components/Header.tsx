import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    header: {
        background: "cyan",
        height: "80px",
        borderRadius: "0px",
        textAlign: "left"
    },
    headerTitle: {
        padding: "10px"
    }
});

export default function Header() {
    const classes = useStyles();
    return <Paper className={classes.header}>
        <Typography variant="h3" className={classes.headerTitle}>
            Sustain Download Service
        </Typography>
    </Paper>
}