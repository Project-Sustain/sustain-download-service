import * as React from 'react';
import {Select,Box, MenuItem, FormControl} from "@mui/material";

export default function FilterType(props: any) {

    const handleChange = (event: any) => {
        props.filter.setStateFilterType(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 75 }}>
            <FormControl fullWidth>
                <Select
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