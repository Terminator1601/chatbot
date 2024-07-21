import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { keyToLabel } from '../DataFormatConverter'

export default function SuiAutoComplete(props) {
    return (
        <Autocomplete
            options={props.options || []}
            getOptionLabel={(option) => keyToLabel(option)}
            style={{ width: props.width || 170, }}
            value={props.value}
            onChange={(event, newValue) => {
                props.onChange(newValue)
            }}
            renderInput={(params) =>
                <TextField  {...params}
                    // style = {{ width:200, }}
                    label={props.label}
                    variant='outlined'
                    size="small"
                />
            }
        />
    )
}
