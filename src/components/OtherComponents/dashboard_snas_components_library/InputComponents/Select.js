import React from "react";
import { keyToLabel } from "../DataFormatConverter";
import { MenuItem, TextField } from "@mui/material";
// import { Select as MuiSelect, MenuItem, TextField } from "@mui/material";

export function Select(props){
    return <select className={` btn btn-outline-app-color  ${(props.variant && (props.variant ==='md')) ?'' :' '  } `}
                   value={((!props.value) && props.placeholder)? props.placeholder:props.selectedOption}
                   onChange={(e)=>{
                        if(e.target.value !== props.placeholder){
                            props.onChange(e.target.value)
                        }
                    }}
                    style={{width:props.width?props.width:'100%'}}
        >
            {
                ((!props.value) && props.placeholder)?
                    <option
                        value={props.placeholder}
                        key={'-1'}
                    >
                        {props.placeholder}
                    </option>
                :null
            }
        {
            props.options.length > 0 && (typeof props.options[0] ==='string' || !isNaN(props.options[0]))?
                props.options.map((item,index)=> {
                    return <option
                        value={item}
                        key={index}
                    >{item}
                    </option>
                })
            :
                props.options.map((item,index)=> {
                    return <option
                        value={item.value}
                        key={index}
                    >{item.label}
                    </option>
                })
        }
        </select>
}

export function SuiSelect(props){
    let options = props.options || []
    if(props.options.length > 0 && (typeof props.options[0] ==='string' || !isNaN(props.options[0]))){
        options = [...props.options]
        options = options.map((item)=>{
            return {'label':keyToLabel(item), 'value':item}
        })
    }

    return (
        <TextField
            value={props.value}
            label={props.label}
            select={true}
            size='small'
            fullWidth={props.width?false:true}
            sx={{
                width:props.width || '200px',
            }}
            onChange={(e)=>{props.onChange(e.target.value)}}
        >
            {
                options.map((item, index)=>{
                    return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                })
            }
        </TextField>
    )
}