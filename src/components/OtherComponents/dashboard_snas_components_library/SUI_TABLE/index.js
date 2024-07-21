import React from 'react'
import './Table.css'
import BaseTable from './BaseTable'
import TableWithLocalPagination from './TableWithLocalPagination'
import TableWithCustomPagination from './TableWithCustomPagination'
import TableWithAutoFetch from './TableWithAutoFetch'

export default function SuiTable(props) {
    let tableType = 'base_table'
    if (Boolean(props.autoFetchData)) {
        tableType = 'auto_fetch_table'
    }
    else if (Boolean(props.disablePagination) === false ){
        if(Boolean(props.customPagination)) {
            tableType = 'table_with_custom_pagination'
        }
        else{
            tableType = 'table_with_local_pagination'
        }
    }

    return (
        tableType === 'auto_fetch_table'
            ? <><TableWithAutoFetch {...props} /> </>
            : tableType === 'table_with_local_pagination'
                ?<> <TableWithLocalPagination {...props} /> </>
                :tableType === 'table_with_custom_pagination' 
                ?<><TableWithCustomPagination  {...props}  /></>
                :<><BaseTable {...props} /> </>
    )
}