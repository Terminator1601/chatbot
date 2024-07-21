import React, { useEffect, useRef, useState } from "react";
import RelativeTimeComponent from "./RelativeTimeComponent";
import AbsoluteTimeComponent from "./AbsoluteTimeComponent";
import { CalendarMonth } from '@mui/icons-material';
import { Box, Popover, TextField, Tabs, Tab } from '@mui/material';

import { keyToLabel } from "../../../DataFormatConverter";
import { SuiPopover } from "../../Popover";

export function DateTimeSelector(props) {
    const propsTimeperiodObject = props.timeperiodObject && (typeof props.timeperiodObject === 'object')?props.timeperiodObject : {}
    const setPropsTimeperiodObject = props.setTimeperiodObject
    if(!propsTimeperiodObject.startDateTime || !propsTimeperiodObject.endDateTime){
        const now = new Date();
        // propsTimeperiodObject.startDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        // propsTimeperiodObject.endDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    }
    const [timeperiodObject, setTimeperiodObject] = useState({
        'type': 'datetime',
        // 'isAbsoluteTime': false,
        'relativity_type': 'last', //or 'next'
        'keyword': '',
        'relative_quantity': '1',
        'relative_unit': 'hour', //or 'minute', 'hour', 'day', 'week', 'month'
        'startDateTime': '',
        'endDateTime': '',
        ...propsTimeperiodObject
    })
    const [timeType, setTimeType] = useState(0)
    const [closePopOverTrigger, setClosePopOverTrigger] = useState(0)

    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            // Skip  run when useEffect is called first time
            isFirstRun.current = false;
            return;
        }
        setPropsTimeperiodObject(timeperiodObject)
    }, [timeperiodObject]);

    function formatDateToISO(date) {
        if (date && date!= "Invalid Date"){
            const pad = (num) => (num < 10 ? '0' + num : num);
      
            const year = date.getFullYear();
            const month = pad(date.getMonth() + 1); // Months are zero-based in JavaScript
            const day = pad(date.getDate());
            const hours = pad(date.getHours());
            const minutes = pad(date.getMinutes());
            const seconds = pad(date.getSeconds());
            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        }
        else{
            return 'Invalid Date'
        }
    }

    let startDateTimeISO = ''
    let endDateTimeISO = ''
    try {
        startDateTimeISO = formatDateToISO(new Date(timeperiodObject.startDateTime))
        endDateTimeISO = formatDateToISO(new Date(timeperiodObject.endDateTime))
    }
    catch {
        console.log('Invalid date', startDateTimeISO, endDateTimeISO)
    }

    const closePopOver = () => {
        setClosePopOverTrigger(prev => prev + 1)
    }

    let label = timeperiodObject.keyword 
    ? keyToLabel(timeperiodObject.keyword) 
    : startDateTimeISO=='Invalid Date' || endDateTimeISO=='Invalid Date' 
        ? ''
        :(startDateTimeISO + ' \u2192 ' + endDateTimeISO)


    const PopUpContent = <Box sx={{ bgcolor: 'background.paper', width: '600px' }}>
        <Tabs
            value={timeType}
            onChange={(e, index) => { setTimeType(index) }}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
        >
            <Tab label="Relative" />
            <Tab label="Absolute" />
        </Tabs>
        <div className='row p-3 mt-4 justify-content-center'>
            {
                timeType === 0
                    ? <RelativeTimeComponent
                        timeperiodObject={timeperiodObject}
                        setTimeperiodObject={setTimeperiodObject}
                        closePopOver={closePopOver}
                    />
                    : <AbsoluteTimeComponent
                        timeperiodObject={timeperiodObject}
                        setTimeperiodObject={setTimeperiodObject}
                        closePopOver={closePopOver}
                    />
            }
        </div>
    </Box>

    return (
        <div className="row align-items-center">
            <div className="col-auto">
                <TextField
                    label="DateTime Select"
                    id="outlined-start-adornment"
                    sx={{ width: label.length + 6 + 'ch', minWidth: '200px' }}
                    value={label}
                    InputProps={{
                        startAdornment: <SuiPopover
                            closePopOverTrigger={closePopOverTrigger}
                            popOverButton={<CalendarMonth sx={{ fontSize: '25px' }} />}
                            popOverContent={PopUpContent}
                        />,
                        sx: {}
                    }}
                    size="small"
                />
            </div>
        </div>
    );
}