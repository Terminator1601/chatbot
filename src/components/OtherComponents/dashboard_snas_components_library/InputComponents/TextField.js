import { Info } from "@mui/icons-material";
import {TextField} from "@mui/material";

export function SuiTextField(props){
    let additionalProps = {}
    if(props.info){
        additionalProps =  {
            InputProps:{
                endAdornment: <div  title={props.info}> <Info /></div>,
            }
        }
    }

    return <TextField
        sx={{
            width:props.width ? props.width:'200px',
            // '&.MuiOutlinedInput-notchedOutline':{
            //     borderColor:'yellow'
            // }
        }}
        value={props.value}
        {...additionalProps}
        // inputProps={{
        //     sx:{
        //         border:'1px solid green',
        //         borderRadius:'3px',
        //         '&:hover fieldset':{
        //             border:'2px solid red!important'
        //         }
        //     }
        // }}
        onChange={(event  )=>{
            props.onChange(event.target.value)
        }}
        label={props.label}
        type={props.type || 'text'}
        size='small'
    />
}