import { Fab, MenuItem, Select, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { SuiSelect } from "../../Select";

export default function DateSelector(props) {

    let maxDaysLimit = props.maxDaysLimit || 30
    if (isNaN(maxDaysLimit)) {
        maxDaysLimit = 30
    }

    const timeperiodOptions = props.timeperiodOptions ||
        [
            { 'label': 'Last one hour', 'value': 'last_hour' },
            { 'label': 'Today', 'value': 'today' },
            { 'label': 'Yesterday', 'value': 'yesterday' },
            { 'label': 'Last Week', 'value': 'last_week' },
            { 'label': 'Last Month', 'value': 'last_month' },
            { 'label': 'Last 3 months', 'value': 'last_3_month' },
            { 'label': 'Custom Range', 'value': 'date_range' }
        ]
    
    const timePeriodObject = props.timeperiodObject || {}
    if(timePeriodObject['selectedTimeperiod']){
        timePeriodObject['selectedTimeperiod'] = 'last_hour'
    }
    if(timePeriodObject['startDate']){
        timePeriodObject['startDate'] = ''
    }
    if(timePeriodObject['endDate']){
        timePeriodObject['endDate'] = ''
    }

    const isDateChangeAllowed = (startDate, endDate) => {
        let allowDateChange = true
        try {
            if (startDate && endDate) {
                let sD = new Date(startDate)
                let eD = new Date(endDate)

                if ((eD.getTime() - sD.getTime()) > (maxDaysLimit * 86400 * 1000)) {
                    alert('Date Range should not exceed ' + maxDaysLimit + ' days')
                    allowDateChange = false
                }
                else if (eD <= sD) {
                    alert("End date should be greater than start date")
                    allowDateChange = false
                }
            }
        } catch {
            console.log('Error in setting date')
        }
        return allowDateChange
    }

    const onStartDateChange = (date) => {
        if (date && (JSON.stringify(date) !== 'null')) {
            let allowDateChange = isDateChangeAllowed(date, timePeriodObject['endDate'])
            if (allowDateChange) {
                props.setTimeperiodObject({...props.timeperiodObject, startDate:date})
            }
        }
        else {
            alert('Invalid Date .. !')
        }
    }

    const onEndDateChange = (date) => {
        if (date && (JSON.stringify(date) !== 'null')) {
            let allowDateChange = isDateChangeAllowed(timePeriodObject['startDate'], date)
            if (allowDateChange) {
                props.onEndDateChange({...props.timeperiodObject, endDate:date})
            }
        }
        else {
            alert('Invalid Date .. !')
        }
    }

    return <div className='d-flex'>
        <div style={{ width: '150px' }}>
            <SuiSelect
                value={timePeriodObject['selectedTimeperiod']}
                onChange={(newValue) => {
                    props.onSelectedTimePeriodChange({...props.timeperiodObject, selectedTimeperiod:newValue})
                }}
                options={timeperiodOptions}
                placeholder='Select Date Range'
                label='Select Date Range'
                width='150px'
                variant='md'
            />
        </div>
        {timePeriodObject.selectedTimeperiod !== 'date_range' ? null :
            <div className="container-fluid d-flex" >
                <div className="row">
                    <div className="col-auto" style={{ width: '180px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                inputFormat="DD/MM/YYYY"
                                margin="normal"
                                label="Start Date"
                                disabled={timePeriodObject.selectedTimeperiod !== 'date_range'}
                                value={timePeriodObject.startDate}
                                // defaultValue={props.chartConfiguration['startDate']===''?getTodayDate():props.chartConfiguration['startDate']}
                                onChange={onStartDateChange}
                                renderInput={(params) => <TextField {...params} size='small' />}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="col-auto" style={{ width: '180px' }} >
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker
                                inputFormat="DD/MM/YYYY"
                                margin="normal"
                                label="EndDate"
                                value={timePeriodObject.endDate}
                                disabled={timePeriodObject.selectedTimeperiod !== 'date_range' || timePeriodObject.startDate === ''}
                                // defaultValue={props.chartConfiguration['startDate']===''?getTodayDate():props.chartConfiguration['startDate']}
                                onChange={onEndDateChange}
                                renderInput={(params) => <TextField {...params} size='small' />}
                            />
                        </LocalizationProvider>
                    </div>

                </div>
            </div>
        }
    </div>
}