import React, { useEffect, useState } from 'react'
import { DateTimeSelector } from '../TimePeriodSelectors'
import { SuiTextField } from '../TextField'
import SuiAutoComplete from '../AutoComplete'
import { SuiSelect } from '../Select'
import { parseUrlParams } from '../../Misc'
import { useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'



export default function GeneralFilter(props) {
    const { filterList, urlToFilterFieldMap } = props
    const location = useLocation()
    const [filters, setFilters] = useState([...filterList])
    const [showFilterComponent, setShowFilterComponent] = useState(false)

    useEffect(() => {
        if(urlToFilterFieldMap && location.search){
            const searchParams = parseUrlParams(location.search)
            const tempFilterOptions = [...filters]
            Object.keys(urlToFilterFieldMap).forEach((key)=>{
                if(key === 'start_date' || key === 'end_date'){
                    if(searchParams['start_date'] && searchParams['end_date']){
                        let timeperiod =  {
                            'type': 'datetime',
                            'relativity_type': 'last', //or 'next'
                            'keyword': '',
                            'relative_quantity': '',
                            'relative_unit': '', //or 'minute', 'hour', 'day', 'week', 'month'
                            'startDateTime': searchParams['start_date'],
                            'endDateTime': searchParams['end_date'],
                        }

                        tempFilterOptions.forEach(item=>{
                            if (item.field === 'timeperiod'){
                                item.value = timeperiod
                            }
                        })
                    }
                }
                else{
                    tempFilterOptions.forEach(item=>{
                        if (item.field === urlToFilterFieldMap[key]){
                            item.value = searchParams[key]
                        }
                    })
                }
            })
            setFilters(tempFilterOptions)
            setTimeout(()=>{
                setShowFilterComponent(true)
            }, 200)
            setTimeout(()=>{
                onApplyButtonClick()
            },400)
        }
        else{
            setShowFilterComponent(true)
        }
    }, [])
    
    const onApplyButtonClick = () => {
        let temp = {}
        for (let row of filters) {
            temp[row.field] = row.value
        }
        props.onFilterChange(temp)
    }

    const updateFilterState = (field, value) => {
        setFilters(prevFilters =>
            prevFilters.map(filter =>
                filter.field === field ? { ...filter, value: value } : filter
            )
        );
    }

    if ( ! showFilterComponent){
        return null
    }

    const Label = ({value})=>  (value && <div className='' style={{width:'200px'}}> <Typography color='primary' variant='body' display='inline'> {value} </Typography> </div> )

    if (props.displayType === 'vertical'){
        return (
            <div className={`app-dark-background-color p-3 px-5 ${props.className}`}>
            {
                filters.map((item, index) => {
                    if (item.type === 'date') {
                        return (
                            <div key={index} className='mb-3 d-flex align-items-center'>
                                <Label value={item.label} />
                                <DateTimeSelector
                                    timeperiodObject={(item.value && typeof item.value === 'object') ? item.value : {}}
                                    setTimeperiodObject={(timeperiodObj) => { updateFilterState(item.field, timeperiodObj) }}
                                />
                            </div>
                        );
                    } else if (item.type === 'text') {
                        return (
                            <div key={index} className='mb-3 d-flex align-items-center'>
                                <Label value={item.label} />
                                <SuiTextField
                                    value={item.value}
                                    width='170px'
                                    info={item.info || `For partial match use * like "*${item.field}*"`}
                                    onChange={(newValue) => {
                                        updateFilterState(item.field, newValue);
                                    }}
                                />
                            </div>
                        );
                    } else if (item.type === 'select') {
                        return (
                            <div key={index} className='mb-3 d-flex align-items-center'>
                                <Label value={item.label} />
                                <SuiSelect
                                    value={item.value}
                                    options={item.options}
                                    width='170px'
                                    onChange={(newValue) => {
                                        updateFilterState(item.field, newValue);
                                    }}
                                />
                            </div>
                        );
                    } else if (item.type === 'autocomplete') {
                        return (
                            <div key={index} className='mb-3 d-flex align-items-center'>
                                <Label value={item.label} />
                                <SuiAutoComplete
                                    options={item.options}
                                    value={item.value}
                                    onChange={(newValue) => {
                                        updateFilterState(item.field, newValue);
                                    }}
                                />
                            </div>
                        );
                    }
                })
            } 
            <div className='d-flex mt-3 d-flex'>
                {props.onCancelButtonClick && <div className=' me-3'>
                    <button
                        className='btn btn-sm btn-app-color bg-danger border-danger'
                        style={{ fontSize: '15px', width: '100px' }}
                        onClick={props.onCancelButtonClick}
                    >
                        {props.cancelButtonName || 'Cancel'}
                    </button>
                </div>}
                <div className=''>
                    <button
                        className='btn btn-sm btn-app-color'
                        style={{ fontSize: '15px', width: '100px' }}
                        onClick={onApplyButtonClick}
                    >
                        {props.applyButtonName || 'Apply'}
                    </button>
                </div>
            </div>
        </div>
        )
    }
    return (
        <div className={`row app-dark-background-color p-3 align-items-center justify-content-center ${props.className}`}>
            {
                filters.map((item, index) => {
                    // if (item.type == 'group') {
                    //     return <FiltersComponent filters={item.filterList} groupRelation={item.groupRelation} />
                    // }
        
                    if (item.type === 'date') {
                        return <div key={'filter' + { index }} className='col-auto'>
                            <DateTimeSelector
                                timeperiodObject={(item.value && typeof item.value === 'object') ? item.value : {}}
                                setTimeperiodObject={(timeperiodObj) => { updateFilterState(item.field, timeperiodObj) }}
                            />
                        </div>
                    }
                    else if (item.type === 'text') {
                        return <div className='col-auto'>
                            <SuiTextField
                                value={item.value}
                                label={item.label}
                                width='170px'
                                info={item.info || `For partial match use * like "*${item.field}*"`}
                                onChange={(newValue) => {
                                    updateFilterState(item.field, newValue)
                                }}
                            />
                        </div>
                    }
                    else if (item.type === 'select') {
                        return <div className='col-auto'>
                            <SuiSelect
                                value={item.value}
                                label={item.label}
                                options={item.options}
                                width='170px'
                                // info={item.info || `For partial match use * like "*${item.field}*"`}
                                onChange={(newValue) => {
                                    updateFilterState(item.field, newValue)
                                }}
                            />
                        </div>
                    }
                    else if (item.type === 'autocomplete') {
                        return <div className='col-auto'>
                            <SuiAutoComplete 
                              options = {item.options}
                              label = {item.label}
                              value = {item.value}
                              onChange={(newValue)=>{
                                updateFilterState(item.field, newValue)
                              }}
                            />
                        </div>
                    }
                })
            }
            <div className='col-1'>
                <button
                    className='btn btn-sm btn-app-color'
                    style={{ fontSize: '15px', width: '100px' }}
                    onClick={onApplyButtonClick}
                >
                    Apply
                </button>
            </div>
        </div>
    )
}

// return <div className='col-lg-2 col-md-4 col-sm-6'></div>