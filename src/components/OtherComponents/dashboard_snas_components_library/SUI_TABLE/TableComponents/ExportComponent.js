import React, { useState } from 'react'
import { GenerateCSV, GeneratePDF } from '../HelperFunctions'
import { useReactToPrint } from 'react-to-print'



export function ExportComponent(props) {

    const enableFetchingAllData = props.getAllTableData ? true : false

    const [showExportWidget, setShowExportWidget] = useState({
        contentSelector: false,
        typeSelector: false
    })

    const [selectedExportOption, setSelectedExportOption] = useState({
        'content': 'current',
        'type': 'csv',
    })

    const onExportCSVClick = ()=>{
        if(selectedExportOption.content ==='current'){
            GenerateCSV(props.tableColumns, props.tableRows, props.tableTitle)
        }
        else{
            if(props.getAllTableData){
                props.getAllTableData(
                    (response)=>{
                        if(response['data'] ){
                            GenerateCSV(props.tableColumns, response['data'], props.tableTitle)
                        }
                    }
                )
            }
            else{
                alert('Sorry, Unable to export all data !!')
            }
        }
    }

    const onExportPDFClick = useReactToPrint({
        content: () => props.componentPdfRef.current,
        documentTitle: "userData",
        onAfterPrint: () => { setShowExportWidget({
            contentSelector: false,
            typeSelector: false
        }) }
    })

    return (
        <>
            <span className="material-icons app-color cursor-pointer mx-2"
                onClick={() => {
                    if (showExportWidget.contentSelector || showExportWidget.typeSelector) {
                        setShowExportWidget({ contentSelector: false, typeSelector: false })
                    }
                    else {
                        if (enableFetchingAllData) {
                            setShowExportWidget({ contentSelector: true, typeSelector: false })
                        }
                        else {
                            setShowExportWidget({ contentSelector: false, typeSelector: true })
                        }
                    }
                    
                }}
            >
                download
            </span>
            <div className='position-relative'>
                <div className='position-absolute'
                    style={{ top: 20, right: 0 }}
                >
                    {showExportWidget.contentSelector ?
                        <div
                            className='d-flex justify-content-center align-items-center 
                                        shadow-lg rounded 
                                        border
                                        border-primary
                                        export-widget'
                        >
                            <button className='btn btn-sm btn-primary me-4'
                                onClick={() => {
                                    setShowExportWidget({ contentSelector: false, typeSelector: true })
                                    setSelectedExportOption(prev => ({ ...prev, content: 'current' }))
                                }}
                            >
                                Export Current Page
                            </button>
                            OR
                            <button className='btn btn-sm btn-primary ms-4'
                                onClick={() => {
                                    setShowExportWidget({ contentSelector: false, typeSelector: true })
                                    setSelectedExportOption(prev => ({ ...prev, content: 'all' }))
                                }}
                            >
                                Export All Data
                            </button>
                        </div>
                        : null
                    }
                    {showExportWidget.typeSelector ?
                        <div
                            className='d-flex justify-content-center align-items-center 
                            shadow-lg rounded 
                            border
                            border-success
                            export-widget'
                        >

                            <button className='btn btn-sm btn-success me-4'
                                onClick={() => {
                                    setSelectedExportOption(prev => ({ ...prev, type: 'csv' }))
                                    onExportCSVClick()
                                }}
                            >
                                Export as CSV
                            </button>
                            {selectedExportOption.content === 'current' ?
                                <>
                                    <div>OR</div>
                                    <button className='btn btn-sm btn-success ms-4'
                                        onClick={() => {
                                            setSelectedExportOption(prev => ({ ...prev, type: 'pdf' }))
                                            onExportPDFClick()
                                        }}
                                    >
                                        Export as PDF
                                    </button>
                                </>
                                : null
                            }
                        </div>
                        : null
                    }
                </div>
            </div>
        </>
    )
}



