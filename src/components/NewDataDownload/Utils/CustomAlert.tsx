import * as React from 'react';
import Alert from '@mui/material/Alert';
import {makeStyles} from "@material-ui/core/styles";
import {alertType} from "./types";

const useStyles = makeStyles({
    root: {
        position: "fixed",
        bottom: "2%",
        right: "2%",
        zIndex: 1001,
    },
});

export default function CustomAlert(props: any) {
// export default function CustomAlert(props: { alert: alertType }) {
    const classes = useStyles();

    if(props.alert.alertState.open) {
        return (
            <Alert className={classes.root} severity={props.alert.alertState.severity}>
                {props.alert.alertState.text}
            </Alert>
        )
    }
    else return null;
}