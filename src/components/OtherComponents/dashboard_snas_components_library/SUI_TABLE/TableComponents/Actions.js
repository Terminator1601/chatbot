import { useEffect, useState } from "react"

export const ActionColumnRow = (props) => {
    return <>
        {
            (props.actions && props.actions.length > 0) ?
                <td
                    className={` app-dark-font-color h-100 ${props.tableStyle.customCellStyleClassName || ''} ${props.tableStyle.actionColumnStyleClassName || ''} `}
                    style={{ ...props.tableStyle.customCellStyle, ...props.tableStyle.actionColumnStyle }}
                >
                    <>
                        <div className=" d-flex align-items-center justify-content-left h-100">
                            {
                                props.actions.map((item) => {
                                    return (
                                        <div onClick={() => { item.onClick(props.row) }}>
                                            {item.icon}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                </td>
                : null
        }
    </>
}

export const ActionColumnHeader = (props) => {
    return (props.actions && props.actions.length > 0) ?
        <th>Actions</th> : null
}

export const SelectAllHeader = (props) => {
    return Boolean(props.onSelect ) &&
        <th>
            <div className="w-100 h-100 d-flex justify-content-start align-items-center">
                <span className="material-icons cursor-pointer" style={{ 'fontSize': '20px' }}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        props.setTableData((oldTableData) => {
                            let temp = { ...oldTableData }
                            // alert(JSON.stringify(temp))
                            temp.tableRows = temp.tableRows.map((tempRow) => {
                                tempRow['selected'] = true
                                return tempRow
                            })
                            // alert(JSON.stringify(temp.tableRows))
                            return temp
                        })
                    }}
                >done_all</span>
            </div>
        </th>
}

export const SelectRow = (props) => {

    const [checkedState, setCheckedState] = useState(false)
    const propsRowSelected = props.row['selected']
    useEffect(() => {
        const checked = ('selected' in props.row) && (props.row['selected'] === true)
        setCheckedState(checked)
    }, [propsRowSelected])

    const onRowCheckStatusChange = () => {
        // setChecked(true)
        props.setTableData((oldTableData) => {
            let temp = { ...oldTableData }
            let currEvent = { }
            let rowCheckedStatus = Boolean(temp.tableRows[props.index]['selected'])
            temp.tableRows[props.index]['selected'] = !rowCheckedStatus
            const selectedRows = temp.tableRows.filter((row)=>(row['selected']))
            props.onSelect({ 'selectedRows': selectedRows, 'currEvent':{ 'eventType':rowCheckedStatus?'unselect':'select', row:temp.tableRows[props.index] }})
            return temp
            // temp.tableRows = temp.tableRows.map((tempRow, tempIndex) => {
            //     if (tempIndex === props.index) {
            //         if (checkedState) {
            //             tempRow['selected'] = false
            //             selectedRow.push(...tempRow)
            //         }
            //         else {
            //             tempRow['selected'] = true
            //             selectedRows.push({...tempRow})
            //         }
            //     }
            //     return tempRow
            // })
        })
    }

    return Boolean(props.onSelect) &&
        <td
            className={` app-dark-font-color h-100 ${props.tableStyle.customCellStyleClassName || ''} ${props.tableStyle.actionColumnStyleClassName || ''} `}
            style={{ ...props.tableStyle.customCellStyle, ...props.tableStyle.actionColumnStyle }}
        >
            <>
                <div className=" d-flex align-items-center justify-content-left h-100">
                    <div>
                        <input
                            type='checkbox'
                            className="cursor-pointer"
                            checked={checkedState}
                            onChange={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                onRowCheckStatusChange()
                            }}
                        />
                    </div>
                </div>
            </>
        </td>
}
