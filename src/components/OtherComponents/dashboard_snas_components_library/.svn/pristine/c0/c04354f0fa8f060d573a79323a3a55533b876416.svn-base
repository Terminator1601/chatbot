import BaseTable from "./BaseTable";
import React, { useEffect, useState, useRef } from 'react'
import { fetchPostJson } from '../FetchUtils';

export default function TableWithAutoFetch(props) {
    const [pageNumber, setPageNumber] = useState(0)
    const [pageSize, setPageSize] = useState(100)
    const [tableData, setTableData] = useState({
        tableRows: [],
        tableColumns: [],
        tableTitle: props.tableConfig.title ?? ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const prevRequestResponseRef = useRef(null)

    const propsRequestData = props.requestData

    useEffect(() => {
        setIsLoading(true)
        let requestData = {
            ...propsRequestData,
            'requestType': 'chartTable',
            'pageNum': pageNumber,
            'pageSize': pageSize,
        }
        if (prevRequestResponseRef.current){
            // Add previous request and response
            requestData['prevRequest'] = prevRequestResponseRef.current?.prevRequest
            requestData['prevResponse'] = prevRequestResponseRef.current?.prevResponse
        }
        const onFailure = (response) => {
            setTableData({
                tableRows: [],
                tableColumns: []
            })
            setIsLoading(false)
        }
        const onSuccess = (response) => {
            const tableColumns = Array.isArray(response['table_columns']) ? response['table_columns'] : []
            setTableData({
                tableRows: Array.isArray(response['table_rows']) ? response['table_rows'] : [],
                tableColumns: tableColumns,
                tableTitle: response?.requestBody?.tableTitle ?? props.tableConfig.title
            })
            if(props.sendPrevRequestResponse){
                let temp = { 'prevRequest':{}, 'prevResponse':{} }
                if (props.sendPrevRequestResponse?.requestKeys){
                    for (let key of props.sendPrevRequestResponse?.requestKeys){
                        if (key in requestData){
                            temp['prevRequest'][key] = requestData[key]
                        }
                    }
                }
                if( props.sendPrevRequestResponse?.responseKeys){
                    for (let key of props.sendPrevRequestResponse?.responseKeys){
                        if (key in response){
                            temp['prevResponse'][key] = response[key]
                        }
                    }
                }
                if(Object.keys(temp.prevRequest).length > 0 || Object.keys(temp.prevResponse).length > 0){
                    prevRequestResponseRef.current = temp // Store the response as the previous request and response
                }
                else{
                    prevRequestResponseRef.current = null
                }
            }
            setIsLoading(false)
        }
        // alert(JSON.stringify(requestData))
        fetchPostJson(
            window.dashboardConfig.API_URL,
            props.post_url_suffix,
            requestData,
            onSuccess,
            onFailure,
            props.fetchKeyword
        )
    }, [pageNumber, pageSize, propsRequestData]) // Remove prevRequestResponse from the dependency array

    return (
        <BaseTable
            {...props}
            isLoading={isLoading}
            title={tableData.tableTitle}
            tableRows={tableData.tableRows}
            tableColumns={tableData.tableColumns}
            pageNumber={pageNumber}
            pageSize={pageSize}
            onPageChange={(newPage) => setPageNumber(newPage)}
            onChangePageSize={(newSize) => setPageSize(newSize)}
        />
    )
}
