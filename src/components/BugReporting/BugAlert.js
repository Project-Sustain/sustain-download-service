import * as React from 'react';
import {Collapse, IconButton} from '@material-ui/core';
import {Alert} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "100%"
    }
})

export default function BugAlert(props) {
    const classes = useStyles();

    return (
        <Collapse className={classes.root} in={props.alert}>
            <Alert
                severity='warning'
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            props.setAlert(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                Bug Report Sent!
            </Alert>
        </Collapse>
    )
}