import * as React from 'react';
import {FormControl, MenuItem, Select} from "@material-ui/core";

export default function BasicSelect(props: any) {

    const handleChange = (event: any) => {
        props.setStateFilterType(event.target.value);
    };

    return (
        <FormControl>
            <Select
                variant="outlined"
                value={props.stateFilterType}
                onChange={handleChange}
            >
                <MenuItem value={0}>Name</MenuItem>
                <MenuItem value={1}>Dataset</MenuItem>
            </Select>
        </FormControl>
    );
}