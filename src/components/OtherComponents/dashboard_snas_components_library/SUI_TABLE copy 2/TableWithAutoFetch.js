import BaseTable from "./BaseTable";
import React, { useEffect, useRef, useState } from 'react'
import { fetchPostJson } from '../FetchUtils';

export default function TableWithAutoFetch(props) {

    const [pageNumber, setPageNumber] = useState(0)
    const [pageSize, setPageSize] = useState(100)
    const [tableData, setTableData] = useState({
        tableRows:[],
        tableColumns:[],
        tableTitle:props.tableConfig.title??'',
    })

    const [afterKeyCache, setAfterKeyCache] = useState({})

    const afterKeyCacheRef = useRef(afterKeyCache)
    
    const [isLoading, setIsLoading] = useState(false)
    
    const propsRequestData = props.requestData

    useEffect(()=>{ afterKeyCacheRef.current = afterKeyCache },[afterKeyCache])

    useEffect(()=>{
        setIsLoading(true)
        // alert()
        let requestData = {
            ...propsRequestData,
            'requestType': 'chartTable',
            'pageNum': pageNumber,
            'pageSize': pageSize,
            'after_key': afterKeyCacheRef.current[pageNumber]
        }
        const onFailure = (response)=>{
            setTableData({
                tableRows:[],
                tableColumns:[]
            })
            setIsLoading(false)
        }
        const onSuccess = (response) => {
            setTableData(prev=>{
                const newTableData = {
                    tableRows:Array.isArray(response['table_rows'])?response['table_rows'] : [],
                    tableColumns:Array.isArray(response['table_columns'])?response['table_columns'] : [],
                    tableTitle:response?.requestBody?.tableTitle ?? props?.tableConfig?.title,
                }
                return newTableData
                }
            )
            setAfterKeyCache(prev=>({...prev, [pageNumber+1]: response?.requestBody?.after_key}))
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
    },[pageNumber, pageSize, propsRequestData])

    return (
        <>        
        {/* {JSON.stringify(afterKeyCache)} */}
        <BaseTable
            {...props}
            isLoading={isLoading}
            title = {tableData.tableTitle }
            tableRows={tableData.tableRows}
            tableColumns={tableData.tableColumns}
            pageNumber={pageNumber}
            pageSize={pageSize}
            onPageChange={(newPage)=>setPageNumber(newPage)}
            onChangePageSize={(newSize)=>setPageSize(newSize)}
        />
        </>

    )
}