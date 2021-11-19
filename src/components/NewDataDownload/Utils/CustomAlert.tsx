import * as React from 'react';
import Alert from '@mui/material/Alert';
import {makeStyles} from "@material-ui/core/styles";
import {alertState, alertType} from "./types";
import {AlertColor} from "@mui/material";

const useStyles = makeStyles({
    root: {
        position: "fixed",
        bottom: "2%",
        right: "2%",
        zIndex: 1001,
    },
});

//FIXME Problem #2 get these prop types to work
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