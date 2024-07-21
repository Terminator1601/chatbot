import React, { useEffect, useState } from 'react'
import { DateTimeSelector } from '../TimePeriodSelectors'
import { SuiTextField } from '../TextField'
import SuiAutoComplete from '../AutoComplete'
import { SuiSelect } from '../Select'
import { parseUrlParams } from '../../Misc'
import { useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'



export default function ConfigHandler(props) {
    const { configOptions, initConfig, onConfigChange, updateConfigFromParentTrigger } = props
    const [configuration, setConfiguration] = useState({...configOptions})

    const onApplyButtonClick = () => {
        let temp = {}
        Object.keys(configuration).forEach((section)=>{
            if(!temp[section]){
                temp[section] = {}
            }
            configuration[section]['section_filters'].forEach(filter=>{
                temp[section][filter['field']] = filter['value']
            })
        })
        onConfigChange(temp)
    }

    const updateFilterState = (section, field, value) => {
        setConfiguration(prevConfig =>{
            let temp = {...prevConfig}
            Object.keys(prevConfig).forEach((section)=>{
                prevConfig[section]['section_filters'].forEach((filter, index)=>{
                    if(filter.field === field){
                        temp[section]['section_filters'][index]['value'] = value
                    }
                })
            })
            return temp
        }
        );
    }

    useEffect(() => {
        if(initConfig){
            let temp = { ...configOptions}
            Object.keys(configOptions).forEach(section=>{
                configOptions[section]['section_filters'].forEach((filterRow, index)=>{
                    if( ( section in initConfig ) &&  ( filterRow.field in initConfig[section] ) ) {
                        temp[section]['section_filters'][index]['value'] = initConfig[section][filterRow.field]
                    }
                })
            })
            setConfiguration(temp)
        }
    }, [updateConfigFromParentTrigger])

    const Label = ({value})=>  (value && <div className='' style={{width:'200px'}}> <Typography variant='body' display='inline'> {value} </Typography> </div> )

    return (
        <div className={`app-dark-background-color p-3 px-5 ${props.className}`}>            
            {
                Object.keys(configuration).map((section, index)=>{
                    return <>
                        <Typography className='row mt-4' variant='h6'>{configuration[section]?.section_label}</Typography>
                        <div className='row'>
                            {
                                configuration[section]['section_filters'].map((item, index) => {
                                    if (item.type === 'date') {
                                        return (
                                            <div key={index} className='mb-3 d-flex align-items-center'>
                                                <Label value={item.label} />
                                                <DateTimeSelector
                                                    timeperiodObject={(item.value && typeof item.value === 'object') ? item.value : {}}
                                                    setTimeperiodObject={(timeperiodObj) => { updateFilterState(section, item.field, timeperiodObj) }}
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
                                                    info={item.info}
                                                    onChange={(newValue) => {
                                                        updateFilterState(section, item.field, newValue);
                                                    }}
                                                />
                                            </div>
                                        );
                                        
                                    } else if (item.type === 'password') {
                                        return (
                                            <div key={index} className='mb-3 d-flex align-items-center'>
                                                <Label value={item.label} />
                                                <SuiTextField
                                                    value={item.value}
                                                    width='170px'
                                                    type='password'
                                                    info={item.info}
                                                    onChange={(newValue) => {
                                                        updateFilterState(section, item.field, newValue);
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
                                                        updateFilterState(section, item.field, newValue);
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
                                                        updateFilterState(section, item.field, newValue);
                                                    }}
                                                />
                                            </div>
                                        );
                                    }
                                })
                            }
                        </div>
                    </>
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
// return <div className='col-lg-2 col-md-4 col-sm-6'></div>