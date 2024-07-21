import { useEffect, useState } from "react"
import { fetchPostJson } from "../FetchUtils"
import SuiTable from "../SUI_TABLE"
import { useDispatch } from "react-redux"
import { editModalConfig } from "../../../ReduxManagement/uiSlice"
import { LoadingElement } from "../UiUtils"


export const TopStatsDisplay = (props) => {
    const width = (100 / props.singleStatsConfig.length - 2) + '%'
    return <div className='row d-flex justify-content-evenly m-4'>
        {
            props.singleStatsConfig.map((item) => {
                return item?.fetchConfig?.autoFetch
                    ? <StatDisplayWithFetch item={item} width={width} />
                    : <StatDisplay item={item} width={width} />
            })
        }
    </div>
}

const StatDisplayWithFetch = (props) => {
    const propsItem = props.item
    const dispatch = useDispatch()
    const propsRequestData = propsItem.fetchConfig.requestData
    const [item, setItem] = useState(propsItem)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        let requestData = {
            ...propsRequestData,
            'requestType': 'singleStat',
        }
        const onFailure = (response) => {
            setItem(prev => ({ ...prev, fetchConfig: { ...prev.fetchConfig, requestData: { ...propsRequestData } }, value: '-' }))
            setIsLoading(false)
        }
        const onSuccess = (response) => {
            if (response && response.data && response.data[0] ) {
                setItem(prev => ({ ...prev, fetchConfig: { ...prev.fetchConfig, requestData: { ...propsRequestData } }, value: response.data[0][0]??'-' }))
            }
            else {
                setItem(prev => ({ ...prev, fetchConfig: { ...prev.fetchConfig, requestData: { ...propsRequestData } }, value: '-' }))
            }
            setIsLoading(false)
        }
        // alert(JSON.stringify(requestData))
        fetchPostJson(
            props.URL || window.dashboardConfig.API_URL,
            item.fetchConfig.url_path,
            requestData,
            onSuccess,
            onFailure,
            props.fetchKeyword
        )
    }, [propsRequestData])

    let onStatClick = null
    if (propsRequestData && item?.tableFetchConfig?.autoFetchTableData) {
        onStatClick = () => {
                window.universalModalElement = <SuiTable
                    autoFetchData={true}
                    requestData={propsRequestData}
                    post_url_suffix={item?.tableFetchConfig?.post_url_suffix || 'idsapi/static_table_data'}
                    tableConfig={{ 'title': item.chartLabel }}
                />
                dispatch(editModalConfig({
                    showModalElement: true,
                }))
            }
        }
    item.onClick = onStatClick
    return <StatDisplay item={item} width={props.width} isLoading={isLoading} onStatClick={onStatClick} />
}

const StatDisplay = ({ item, width, isLoading }) => {
    return <div className='btn m-2 p-2 border-3 rounded-3 app-color-border shadow-lg app-dark-background-color'
        style={{ width: width, maxWidth: '400px' }}
        onClick={
            () => {
                // onChartClick({'label_name':'', 'label_type':'stats'}, props.widgetData)
                if (item.onClick) {
                    item.onClick(item.chartLabel)
                }
                if (item.onStatClick) {
                    item.onStatClick(item.chartLabel)
                }
            }
        }>
        <LoadingElement show={isLoading} />
        <div className='w-100 d-flex justify-content-center'>{item.chartLabel}</div>
        <div className='w-100 d-flex justify-content-center app-color mt-1'><h4>{item.value}</h4></div>
    </div>
}