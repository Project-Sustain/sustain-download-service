import * as React from 'react';
import Alert from '@mui/material/Alert';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        position: "fixed",
        bottom: "2%",
        right: "2%",
    },
});

export default function CustomAlert(props: any) {
    const classes = useStyles();

    if(props.alert.alertState.open) {
        return (
            <Alert
                className={classes.root} severity={props.alert.alertState.severity}
                onClose={() => {
                    props.set({
                        open: false,
                        test: "",
                        severity: ""
                    });
                }}
            >
                {props.alert.alertState.text}
            </Alert>
        )
    }
    else return null;
}