import React, { useEffect, useState, useRef, useMemo } from "react";
import { Select } from "../InputComponents/Select"
import {
    DFC_convert_table_row_and_columns_to_standard_format,
    filterTableData,
    sortTableData,
} from "./HelperFunctions";
import "./Table.css";
// import {ExportComponent} from "./TableComponents/ExportComponent";
import {ActionColumnHeader, ActionColumnRow, ExportComponent, SelectAllHeader, SelectRow} from './TableComponents'
import { LoadingElement } from "../UiUtils";
import RightClickContextMenu from "./TableComponents/RightClickContextMenu";
function BaseTable(props) {
    const [sortConfig, setSortConfig] = useState({
        columnName: "",
        order: "",
    });
    const [tableData, setTableData] = useState({
        tableRows: [],
        tableColumns: [],
    });
    const [tempFilter, setTempFilter] = useState(null);
    const [mainFilter, setMainFilter] = useState("");
    const [selectedRows, setSelectedRows] = useState({'selectedRows':[], 'curr_event':{}})
    const [contextMenuConfig, setContextMenuConfig] = useState({
        showContextMenu:false,
        x:0,
        y:0,
        rowData:[],
    })
    const propsTableRows = props.tableRows;
    const propsTableColumns = props.tableColumns;

    let standardTableData = useMemo(() => {
        return DFC_convert_table_row_and_columns_to_standard_format(
            propsTableColumns,
            propsTableRows
        );
    }, [propsTableColumns, propsTableRows]);

    useEffect(() => {
        let tempTableData = { ...standardTableData };
        tempTableData.tableRows = filterTableData(
            mainFilter,
            tempTableData.tableRows
        );
        tempTableData.tableRows = sortTableData(
            sortConfig,
            tempTableData.tableRows
        );
        if (
            props.dataFormatConversionConfig &&
            Object.keys(props.dataFormatConversionConfig).length > 0
        ) {
            let key;
            tempTableData.tableRows = tempTableData.tableRows.map((row) => {
                row['originalRow'] = {...row}
                console.log(row)
                for (key in props.dataFormatConversionConfig) {
                    if (key in row && row[key] != "") {
                        row[key] = props.dataFormatConversionConfig[key](row[key]);
                    }
                }
                return row;
            });
        }
        setTableData(tempTableData);
        return () => {
        };
    }, [props.tableColumns, props.tableRows, sortConfig, mainFilter]);

    const title = props.title ? props.title : "Table";
    
    const contextMenu = props?.contextMenu
    
    useEffect(()=>{
        const handleClick = ()=> setContextMenuConfig({showContextMenu:false});

        if (contextMenu){
            window.addEventListener("click", handleClick);        
        }
        return ()=>{
            if (contextMenu){
                window.removeEventListener("click", handleClick);
            }
            setTableData({ 
                tableRows: [],
                tableColumns: [],
            })
        }
    },[])

    useEffect(() => {
        let timerId;
        if (tempFilter != null) {
            timerId = setTimeout(() => {
                setMainFilter(tempFilter);
            }, 500);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [tempFilter]);


    const onColumnNameClick = (columnName) => {
        if (sortConfig.order === 'asc') {
            setSortConfig({ columnName: columnName, order: 'desc' })
        }
        else if (sortConfig.order === 'desc') {
            setSortConfig({ columnName: '', order: '' })
        }
        else {
            setSortConfig({ columnName: columnName, order: 'asc' })
        }
    }

    const componentPdfRef = useRef()

    const tableRows = tableData.tableRows
    const tableColumns = tableData.tableColumns
    if (props.specificColumnStyle){
        tableColumns.forEach(column=>{
            if (column.field in props.specificColumnStyle){
                column.columnStyle = {...column.columnStyle, ...props.specificColumnStyle[column.field]}
            }
        })
    }

    if (!tableData.tableRows || !tableData.tableColumns) {
        return <div className="table_wrapper w-100 h-100" >
            Error in Displaying Table
        </div>
    }
    let tableLength = tableData.tableRows.length;

    return (
        <>
            <div className={`w-100 h-100 p-0 m-0 ${props.tableStyleClassName || '' }`}  >
                { contextMenu && contextMenuConfig.showContextMenu && <RightClickContextMenu contextMenu={contextMenu} contextMenuConfig={contextMenuConfig} setContextMenuConfig={setContextMenuConfig} />}
                {props.hideTitleBar ? null :
                    <div className='font-size-x-large d-flex app-dark-background-color ps-3 align-items-center '>
                        <div className="flex-grow-1"> {title} </div>
                        <div>{props.tableTitleComponent ? props.tableTitleComponent : null} </div>
                        <div>
                            <div className="p-2">
                                <input className="form-control app-color-control"
                                    id="tablesearch11"
                                    placeholder="Search"
                                    onChange={(e) => {
                                        setTempFilter(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <ExportComponent
                            tableRows={tableRows}
                            tableColumns={tableColumns}
                            getAllTableData={props.getAllTableData}
                            tableTitle={title}
                            componentPdfRef={componentPdfRef}
                        />
                    </div>
                }
                {
                    props.tableTaskbarComponent &&  <div className='d-flex app-dark-background-color px-3 align-items-center justify-content-left w-100'>
                        {props.tableTaskbarComponent}
                    </div>
                }
                {
                    props.isLoading && <>
                    <LoadingElement show={true}/>
                    </>
                }
                <div
                    className='table-responsive '
                    ref={componentPdfRef}
                    style={{
                        height: props.tableStyle.tableBodyHeight || '100%',
                        maxHeight: props.tableStyle.maxTableBodyHeight || '700px',
                        minHeight: props.tableStyle.minTableBodyHeight || '200px'
                    }}
                >
                    <table className='table'>
                        <thead className='sticky_table_header'>
                            <tr>
                                <SelectAllHeader 
                                    onSelect={props.onSelect} 
                                    tableStyle={props.tableStyle} 
                                    setTableData={setTableData}
                                    selectedRows={selectedRows}
                                    setSelectedRows={setSelectedRows}
                                />
                                <ActionColumnHeader actions={props.actions} />
                                {
                                    tableColumns.map((item, index) => {
                                        return <th key={`table_row_${index}`} 
                                            style={{...props.tableStyle.customHeaderStyle, ...item.columnStyle, ...item.headerOnlyStyle}}  
                                            className={`${props.tableStyle.customHeaderStyleClassName}, ${item.columnStyleClassName}, ${item.headerOnlyStyleClassName}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                onColumnNameClick(item.field)
                                            }}
                                        >
                                            {
                                                sortConfig.columnName === item.field ?
                                                    <div className='d-flex'>
                                                        <div>{item.title}</div>
                                                        <div><span className="material-icons " style={{ fontSize: '15px' }}>{sortConfig.order === 'asc' ? 'arrow_upward' : 'arrow_downward'}</span></div>
                                                    </div>
                                                    :
                                                    item.title
                                            }
                                        </th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody >
                            {props.isLoading ? <tr><td className='d-flex justify-content-center pt-5'>Data is being loaded...</td></tr> : tableRows.length === 0 ? <tr><td className='d-flex justify-content-center pt-5'> No records to show</td></tr> :
                                tableRows.map((row, index) => {
                                    return <tr key={index} onClick={
                                        props.onRowClick ?
                                            (e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                props.onRowClick(row)
                                            }
                                            : () => {
                                                // do nothing
                                            }
                                    }
                                        onContextMenu={(event) => {
                                            if (contextMenu) {
                                                event.preventDefault()
                                                setContextMenuConfig({
                                                    x:event.pageX,
                                                    y:event.pageY,
                                                    rowData:row,
                                                    showContextMenu:true
                                                })
                                            }
                                        }}
                                        style={{...props.tableStyle.customRowStyle}}
                                        className={`${props.tableStyle.customRowStyleClassName || ''}`}
                                    >
                                        <SelectRow 
                                            row={row}
                                            index={index}
                                            tableStyle={props.tableStyle} 
                                            setTableData={setTableData} 
                                            onSelect={props.onSelect}
                                            selectedRows={selectedRows}
                                            setSelectedRows={setSelectedRows}
                                        />
                                        <ActionColumnRow row={row} index={index} actions={props.actions} tableStyle={props.tableStyle}/>
                                        {
                                            tableColumns.map((item, i) => {
                                                return <td
                                                    key={i}
                                                    className={`name app-dark-font-color ${props.tableStyle.customCellStyleClassName || ''} ${item.columnStyleClassName || ''} `}
                                                    style={{ ...props.tableStyle.customCellStyle, ...item.columnStyle }}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        if (props.onCellClick) {
                                                            e.stopPropagation()
                                                            props.onCellClick({ 'row': row, 'clickedColumnName': item.field, 'clickedValue':row[item.field] })
                                                        }
                                                    }}
                                                >
                                                    {row[item.field]}
                                                </td>
                                            })
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {Boolean(props.disablePagination) ? null :
                    <div className="d-flex align-items-center mt-2">
                        <div className="flex-grow-1"> No of Rows: {tableRows.length} </div>
                        {props.onChangePageSize === undefined ? null :
                            <div className='me-4 ' style={{ zIndex: 5 }}>
                                <Select
                                    options={[{ label: '10', value: 10 }, { label: '100', value: 100 },
                                    { label: '500', value: 500 }, { label: '1000', value: 1000 },]}
                                    selectedOption={props.pageSize}
                                    onChange={(pageSize)=>{ props.onPageChange(0); props.onChangePageSize(pageSize); }}
                                />
                            </div>
                        }
                        <div>
                            <button type="button" disabled={props.pageNumber === 0} className="m-1 btn btn-outline-app-color btn-sm "
                                onClick={() => { if (props.onPageChange !== undefined) { props.onPageChange(props.pageNumber - 1) } }}
                            >Previous</button>
                            {
                                props.pageNumber > 1 ?
                                    <button type="button" className="m-1 btn btn-outline-app-color btn-sm "
                                        onClick={() => { if (props.onPageChange !== undefined) { props.onPageChange(props.pageNumber - 2) } }}
                                    >{props.pageNumber - 1}
                                    </button>
                                    : null
                            }
                            {
                                props.pageNumber > 0 ?
                                    <button type="button" className="m-1 btn btn-outline-app-color btn-sm "
                                        onClick={() => { if (props.onPageChange !== undefined) { props.onPageChange(props.pageNumber - 1) } }}
                                    >{props.pageNumber}
                                    </button>
                                    : null
                            }
                            <button type="button" className="m-1 btn btn-app-color btn-sm ">
                                {props.pageNumber + 1}
                            </button>
                            <button type="button" className={`m-1 btn btn-outline-app-color btn-sm ${tableLength < props.pageSize ? 'd-none' : ''}`}
                                // disabled={tableLength < props.pageSize}
                                onClick={() => { if (props.onPageChange !== undefined) { props.onPageChange(props.pageNumber + 1) } }}
                            >
                                {props.pageNumber + 2}
                            </button>
                            <button type="button" className={`m-1 btn btn-outline-app-color btn-sm ${tableLength < props.pageSize ? 'd-none' : ''}`}
                                disabled={tableLength < props.pageSize}
                                onClick={() => { if (props.onPageChange !== undefined) { props.onPageChange(props.pageNumber + 2) } }}
                            >
                                {props.pageNumber + 3}
                            </button>
                            <button type="button" className="m-1 btn btn-outline-app-color btn-sm "
                                disabled={tableLength < props.pageSize}
                                onClick={() => { if (props.onPageChange !== undefined) { props.onPageChange(props.pageNumber + 1) } }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
export default BaseTable


BaseTable.defaultProps = {
    tableStyle:{}
}