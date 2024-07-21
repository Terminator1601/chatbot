import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, Popover, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function AbsoluteTimeComponent(props) {
    const {timeperiodObject, setTimeperiodObject, closePopOver} = props
    const [startDateTime, setStartDateTime] = useState(timeperiodObject.startDateTime)
    const [endDateTime, setEndDateTime] = useState(timeperiodObject.endDateTime)

    const handleStartDateTimeChange = (newRange) => {
        setStartDateTime(dayjs(newRange).format("YYYY-MM-DD HH:mm:ss"));
    };
    const handleEndDateTimeChange = (newRange) => {
        setEndDateTime(dayjs(newRange).format("YYYY-MM-DD HH:mm:ss"));
    };

    const onApplyButtonClick = ()=>{
        setTimeperiodObject(prev=>({...prev, startDateTime:startDateTime, endDateTime:endDateTime, keyword:''}))
        closePopOver()
    }
    return (<div className="row w-100 justify-content-center">
        <div className="col-auto">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Start Time"
                    inputFormat="DD/MM/YYYY HH:mm:ss"
                    value={startDateTime}
                    onChange={handleStartDateTimeChange}
                    renderInput={(props) => (
                        <TextField
                            {...props}
                            size="small"
                            style={{ width: "200px", border: "none" }}
                        />
                    )}
                />
            </LocalizationProvider>
        </div>
        <div className="col-auto">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="End Time"
                    inputFormat="DD/MM/YYYY HH:mm:ss"
                    value={endDateTime}
                    onChange={handleEndDateTimeChange}
                    renderInput={(props) => (
                        <TextField
                            {...props}
                            size="small"
                            style={{ width: "200px", border: "none" }}
                        />
                    )}
                />
            </LocalizationProvider>
        </div>
        <div className="col-12 d-flex justify-content-center mt-3">
            <button className="btn btn-app-color" style={{width:'100px'}} onClick={onApplyButtonClick}>Apply</button>
        </div>
    </div>
    )
}