import React, { useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { generateRandomString } from '../Misc';

export function SuiPopover(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover-'+generateRandomString(5) : undefined;

    const {closePopOverTrigger} = props
    useEffect(() => {
        if(closePopOverTrigger && closePopOverTrigger > 0 && Boolean(anchorEl)){
            setAnchorEl(null)
        }
    }, [closePopOverTrigger])
    
    return (
        <div>
            {
                typeof props.popOverButton === 'string' ?
                    <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                        {props.popOverButton}
                    </Button>
                    : <div aria-describedby={id} onClick={handleClick}>{props.popOverButton}</div>
            }
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {props.popOverContent}
            </Popover>
        </div>
    );
}