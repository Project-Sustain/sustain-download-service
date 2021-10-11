import * as React from 'react';
import {Select} from "@material-ui/core";

export default function BasicSelect(props: any) {

    const handleChange = (event: any) => {
        props.setStateFilterType(event.target.value);
    };

    return (
        <Select
            variant="outlined"
            value={props.stateFilterType}
            onChange={handleChange}
        >
            <option value={0}>Name</option>
            <option value={1}>Dataset</option>
        </Select>
    );
}