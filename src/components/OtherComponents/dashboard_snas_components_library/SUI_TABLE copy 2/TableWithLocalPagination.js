import React,{ useEffect, useState} from 'react'
import BaseTable from "./BaseTable";

function TableWithLocalPagination(props) {
    const tableRows = props.tableRows
    
    const [pageNumber, setPageNumber] = useState(0)

    const [pageSize, setPageSize] = useState(props.pageSize?props.pageSize:100)

    const onPageChange = (page)=>{
        setPageNumber(page)
    }
    const onChangePageSize = (pageSize)=>setPageSize(pageSize)
    return (
        <div className='w-100 h-100'>
            <BaseTable
                {...props}
                tableRows={tableRows.slice(pageNumber*pageSize, (pageNumber+1)*pageSize)}
                tableColumns={props.tableColumns}
                pageNumber={pageNumber}
                pageSize={ pageSize}
                onPageChange={onPageChange}
                onRowClick={props.onRowClick}
                onChangePageSize={onChangePageSize}
            />
        </div>
    )
}
export default TableWithLocalPagination