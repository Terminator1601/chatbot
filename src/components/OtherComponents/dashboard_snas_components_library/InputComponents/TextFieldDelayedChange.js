import {TextField} from "@mui/material";

export default function MuiTextField(props){
    return <TextField
        sx={{width:props.width}}
        value={props.value}
        onChange={(event  )=>{
            props.onChange(event.target.value)
        }}
        label={props.label}
        size='small'
    />
}