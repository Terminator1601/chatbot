
import React, { useCallback, useState, useEffect } from 'react'
import { SuiSelect } from '../../Select';
import { SuiTextField } from '../../TextField';
import { keyToLabel } from '../../../DataFormatConverter';


export default function RelativeTimeComponent(props) {
    const { timeperiodObject, setTimeperiodObject, closePopOver } = props

    function updateTimePeriodObject(update_object) {
        const input = { ...timeperiodObject, ...update_object }
        let { relativity_type, keyword, relative_quantity, relative_unit } = input;
        let startDate, endDate;
        // Current date and time
        const now = new Date();

        if (keyword) {
            if (keyword === 'today') {
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            }
            else if (keyword === 'yesterday') {
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            }
            else if (keyword === 'last_1_hour') {
                relativity_type = 'last'
                relative_quantity = '1'
                relative_unit = 'hour'
            }
            else if (keyword === 'last_week') {
                relativity_type = 'last'
                relative_quantity = '1'
                relative_unit = 'week'
            }
            else if (keyword === 'last_month') {
                relativity_type = 'last'
                relative_quantity = '1'
                relative_unit = 'month'
            }
            else if (keyword === 'last_3_month') {
                relativity_type = 'last'
                relative_quantity = '3'
                relative_unit = 'month'
            }
        }

        if (keyword !== 'today' && keyword !== 'yesterday') {
            const quantity = parseInt(relative_quantity);
            startDate = new Date(now);
            endDate = new Date(now);
            if (relativity_type === 'last') {
                adjustDate(startDate, -relative_quantity, relative_unit)
                // startDate.setDate(now.getDate() - quantity * getUnitMultiplier(relative_unit));
            } else { // 'next'
                adjustDate(endDate, relative_quantity, relative_unit)
                endDate.setDate(now.getDate() + quantity * getUnitMultiplier(relative_unit));
            }
            keyword = relativity_type + '_' + relative_quantity + '_' + relative_unit
        }

        setTimeperiodObject(prev => ({
            ...prev,
            relativity_type, keyword, relative_quantity, relative_unit,
            startDateTime: startDate,
            endDateTime: endDate
        }))
        // return { startDateTime: startDate.toISOString(), endDateTime: endDate.toISOString() };
    }

    function adjustDate(date, quantity, unit) {
        switch (unit) {
            case 'minute':
                date.setMinutes(date.getMinutes() + quantity);
                break;
            case 'hour':
                date.setHours(date.getHours() + quantity);
                break;
            case 'day':
                date.setDate(date.getDate() + quantity);
                break;
            case 'week':
                date.setDate(date.getDate() + quantity * 7);
                break;
            case 'month':
                date.setMonth(date.getMonth() + quantity);
                break;
            default:
                throw new Error("Unsupported unit type");
        }
    }

    function getUnitMultiplier(unit) {
        switch (unit) {
            case 'minute': return 1 / (24 * 60);
            case 'hour': return 1 / 24;
            case 'day': return 1;
            case 'week': return 7;
            case 'month': return 30; // Approximation
            default: return 0;
        }
    }

    // useEffect(() => {
    //     alert('updateTimePeriodObject')

    //     updateTimePeriodObject({})
    // }, [])


    return (
        <>
            <div className='row ' style={{ width: '100%' }}>
                <div className='col-12'>
                    <div className='row mt-4  justify-content-evenly'>
                        <div className='col-auto'>
                            <SuiSelect
                                options={['last', 'next']}
                                value={timeperiodObject.relativity_type}
                                onChange={(newValue) => { updateTimePeriodObject({ relativity_type: newValue, keyword: '' }) }}
                            />
                        </div>
                        <div className='col-auto'>
                            <SuiTextField
                                value={timeperiodObject.relative_quantity}
                                label={'Num'}
                                width='80px'
                                type='number'
                                onChange={(newValue) => { updateTimePeriodObject({ relative_quantity: newValue, keyword: '' }) }}
                            />
                        </div>
                        <div className='col-auto'>
                            <SuiSelect
                                options={['minute', 'hour', 'day', 'month']}
                                label='Time Unit'
                                value={timeperiodObject.relative_unit}
                                onChange={(newValue) => { updateTimePeriodObject({ relative_unit: newValue, keyword: '' }); closePopOver(); }}
                            />
                        </div>
                    </div>
                    <div className='row justify-content-center p-3'>
                        {
                            ['last_1_hour', 'today', 'yesterday', 'last_week', 'last_month', 'last_3_month'].map(item => {
                                return <div className='col-4 p-2'>
                                    <button className={`btn ${timeperiodObject.keyword === item ? 'btn-app-color' : 'btn-outline-app-color'} w-100`}
                                        onClick={() => { updateTimePeriodObject({ keyword: item }); closePopOver(); }}
                                    >
                                        {keyToLabel(item)}
                                    </button>
                                </div>
                            })
                        }
                    </div>
                    {/* <div className='row justify-content-center p-3'>
                        <div className='col-4 p-2'>
                            <button className='btn btn-app-color w-100' onClick={() => { calculateDateRange(timeperiodObject) }}>
                                Apply
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}