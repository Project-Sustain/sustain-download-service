import * as React from 'react';
import {Select,Box, MenuItem, FormControl} from "@mui/material";
import {filterType} from "../../Utils/types";

interface propTypes {
    filter: filterType
}

export default function FilterType(props: propTypes) {

    const handleChange = (event: any) => {
        props.filter.setStateFilterType(event.target.value);
        props.filter.setStatesMatchingSearch([]);
    };

    return (
        <Box sx={{ minWidth: 75 }}>
            <FormControl fullWidth>
                <Select
                    color="primary"
                    value={props.filter.stateFilterType}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={0}>Name</MenuItem>
                    <MenuItem value={1}>Dataset</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}