import React,{ useEffect, useState} from 'react'
import BaseTable from "./BaseTable";

function TableWithCustomPagination(props) {
    return (
        <BaseTable
            {...props}
            pageNumber={props.customPagination.pageNumber}
            pageSize={ props.customPagination.pageSize}
            onPageChange={props.customPagination.onPageChange}
            onChangePageSize={props.customPagination.onPageSizeChange}
        />
    )
}
export default TableWithCustomPagination