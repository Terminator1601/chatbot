import React, { useEffect, useState } from 'react'
import SUICharts from '../../Charts'
import { fetchPostJson } from '../../FetchUtils'
import './widget.css'
import { Typography } from '@mui/material'
import SuiTable from '../../SUI_TABLE'
import { useDispatch } from 'react-redux'
import { editModalConfig } from '../../../../ReduxManagement/uiSlice'
import { getMinMaxDates } from '../../DateTimeUtils'
import GeneralFilter from '../../InputComponents/Filters/GeneralFilter'
import { LoadingElement } from '../../UiUtils'

export default function SuiWidget(props) {
  const { widgetConfig } = props
  return (
    widgetConfig.fetchConfig
      ? <WidgetWithFetch widgetConfig={widgetConfig} />
      : <Widget widgetConfig={widgetConfig} />
  )
}

function WidgetWithFetch(props) {
  const dispatch = useDispatch()
  const propsWidgetConfig = props.widgetConfig
  const propsRequestData = propsWidgetConfig?.fetchConfig?.requestData
  const filterList = propsWidgetConfig?.fetchConfig?.filterList
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState(null)
  const [additionalFilters, setAdditionalFilters] = useState({})
  useEffect(() => {
    setIsLoading(true)
    let requestData = {
      ...propsRequestData,
      filters:{...propsRequestData.filters, ...additionalFilters},
      'requestType': 'chartData',
    }
    const onFailure = (response) => {
      setChartData(null)
      setIsLoading(false)
    }
    const onSuccess = (response) => {
      response.data && setChartData(response.data)
      setIsLoading(false)
    }
    // alert(JSON.stringify(requestData))
    fetchPostJson(
      propsWidgetConfig.fetchConfig.URL || window.dashboardConfig.API_URL,
      propsWidgetConfig.fetchConfig.url_path,
      requestData,
      onSuccess,
      onFailure,
      propsWidgetConfig.fetchKeyword
    )
  }, [propsRequestData, additionalFilters])

  let onLabelClick = null
  if (propsRequestData && propsWidgetConfig?.tableFetchConfig?.autoFetchTableData) {
    onLabelClick = ({ type, label, date }) => {
      label = getCorrectLabel(label)
      let on_click_filter_keyword = propsWidgetConfig?.tableFetchConfig?.on_click_filter_keyword
      if ((label || label === 0 || label === '') && on_click_filter_keyword) {
        let tempFilters = {}
        if (on_click_filter_keyword === 'timeperiod') {
          let { minDate, maxDate, timezone } = getMinMaxDates(label)

          if (minDate && maxDate) {
            tempFilters.timeperiod = {
              startDateTime : minDate,
              endDateTime : maxDate,
              keyword : '',
              timezone : timezone
            };
          }
        }
        else {
          tempFilters[on_click_filter_keyword] = label
        }
        window.universalModalElement = (
          <SuiTable
              autoFetchData={true}
              requestData={{...propsRequestData, filters:{...propsRequestData.filters, ...additionalFilters, ...tempFilters}}}
              post_url_suffix={props?.tableFetchConfig?.post_url_suffix || 'idsapi/static_table_data'}
              tableConfig={{ 'title': propsWidgetConfig.chartLabel }}
              {...props?.widgetConfig?.tableConfig}
              sendPrevRequestResponse={propsWidgetConfig?.tableFetchConfig?.sendPrevRequestResponse}
          />
        )
        dispatch(editModalConfig({
          showModalElement: true,
        }))
      }
    }
  }
  const onFiltersChange = (filters)=>{ setAdditionalFilters(filters) }
  return <>
  <Widget 
    widgetConfig={{ ...propsWidgetConfig, chartData, onLabelClick, filterList, onFiltersChange }} 
    isLoading={isLoading}
  />
  </>
}

const Widget = ({ widgetConfig, isLoading }) => {
  const { chartType, chartData, chartConfig, chartLabel, onLabelClick, filterList, onFiltersChange } = widgetConfig
  return <div className='p-2 app-dark-background-color rounded h-100 rounded-3 shadow-lg'>
    {/* <div className='bg-info'>{JSON.stringify(chartData)}</div> */}
    <LoadingElement show={isLoading} />
    <div className='widget-title app-color ps-2'>
      <Typography  >{chartLabel}</Typography>
    </div>
    {filterList && onFiltersChange && <GeneralFilter
      filterList={filterList}
      onFilterChange={onFiltersChange}
      className='p-0 m-0 px-2'
    />}
    <div className={`${filterList && onFiltersChange ?'widget-body-with-filter' :'widget-body'}  `}>
      <SUICharts
        {...widgetConfig}
        chartType={chartType}
        chartData={chartData}
        chartConfig={chartConfig}
        onLabelClick={onLabelClick}
      />
    </div>
  </div>
}

const getCorrectLabel = (label)=>{
  try{
    if(label && label.endsWith('.')){
      return label.replace(/\.+$/, '') + '*'
    }
  }
  catch{
    console.log(label)
  }

  return label
}