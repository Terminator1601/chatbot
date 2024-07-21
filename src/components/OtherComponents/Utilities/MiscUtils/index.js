import { useDispatch, useSelector } from "react-redux";
import { editModalConfig, hideRightClickContextMenu } from "../../../ReduxManagement/uiSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const LoadingElement = (props) => {
    if (props.show) {
        if (props.stickyTop) {
            return (
                <div id="ajaxRequestRunningInfiniteProgressBar"
                    className="progress progress-infinite progress-bar-sticky-top ajax-loading-progress-infinite ">
                    <div className="progress-bar-rainbow"></div>
                </div>
            )
        }
        else {
            return (
                <div id="ajaxRequestRunningInfiniteProgressBar position-absolute"
                    className="progress progress-infinite  ajax-loading-progress-infinite ">
                    <div className="progress-bar-rainbow"></div>
                </div>
            )
        }
    }
    else {
        return null
    }
}

export function UniversalModal(props) {
    // const modalElement = useSelector(state=>state.ui.modalElement)
    // const modalElementConfig = useSelector(state=>state.ui.modalElementConfig)

    const showModalElement = useSelector(state => state.ui.showModalElement)
    const [isMinimized, setIsMinimized] = useState(true)
    const dispatch = useDispatch()
    const onClose = () => {
        dispatch(editModalConfig({ showModalElement: false, }))
    }

    useEffect(() => {
        if (showModalElement) {
            setIsMinimized(false)
        }
    }, [showModalElement])




    return (
        <>
            {
                showModalElement && isMinimized ?
                    <div className="border rounded-5 bg-light shadow-lg  cursor-pointer"
                        style={{ position: 'absolute', top: 20, right: 20, padding: 20 }}
                        onClick={() => { setIsMinimized(false) }}
                    >
                        <span className="material-icons app-color "
                            style={{ fontSize: '40px', fontWeight: "bold" }}
                            onClick={() => { setIsMinimized(false) }}
                        >
                            table_view 
                        </span>
                    </div>
                    : null
            }
            <div id="myModal" className="modal" style={{ display: showModalElement ? (isMinimized ? 'none' : "block") : 'none', zIndex: 100 }} >
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-end align-items-center">
                        {/* <span onClick={()=>{onClose()}} className="close">&times;</span> */}
                        <span className="material-icons app-color cursor-pointer"
                            style={{ fontSize: '30px', fontWeight: "bold", marginBottom: '13px', marginRight: '10px' }}
                            onClick={() => {
                                setIsMinimized(true)
                            }}
                        >minimize</span>
                        <span className="material-icons app-color  cursor-pointer"
                            style={{ fontSize: '25px', fontWeight: "bold" }}
                            onClick={onClose}
                        >close</span>
                        {/*<h2>Modal Header</h2>*/}
                    </div>
                    <div className="modal-body app-light-background-color" >
                        {window.universalModalElement !== undefined && window.universalModalElement !== null
                            ? window.universalModalElement : <div>ModalElment not defined</div>}
                    </div>
                    <div className="modal-footer">
                        
                        {/*<h3>Modal Footer</h3>*/}
                    </div>
                </div>
            </div>
        </>
    )
}

export function RightClickContextMenu() {
    const menu = useSelector(state => state.ui.rightClickContextMenu)
    const dispatch = useDispatch()
    if (menu) {
        return <div className="app-dark-background-color cursor-pointer p-4 shadow-lg rounded" style={{ position: 'absolute', left: menu.x, top: menu.y, minWidth: '100px' }}>
            {menu.data.map(item => {
                if (item.link) {
                    return <Link
                        className="text-decoration-none"
                        to={item.link}>
                        <div onClick={() => { dispatch(hideRightClickContextMenu()) }}
                            className="border-bottom">
                            {item.name}
                        </div>
                    </Link>
                }
                else {
                    return <div onClick={item.onMenuItemClick} className="border-bottom">
                        {item.name}
                    </div>
                }
            })}
        </div>
    }
    else {
        return null
    }
}



export const generateAgentRedirectionPathFromRow = (rowData, labelDict)=>{
    const { sourceIPLabel, destIPLabel, destPortLabel, startDateLabel, endDateLabel } = labelDict
    let urlPath = []
    if(startDateLabel && rowData[startDateLabel]){
        let temp =new Date(rowData[startDateLabel])
        if (temp!='Invalid Date'){
            temp.setHours(temp.getHours() - 3);
            urlPath.push('start_date='+temp.toISOString())
        }
    }
    if(endDateLabel && rowData[endDateLabel]){
        let temp =new Date(rowData[endDateLabel])
        if (temp!='Invalid Date'){
            temp.setHours(temp.getHours() + 3);
            console.log({'end_date':temp})
            urlPath.push('end_date='+temp.toISOString())
        }
    }
    if(sourceIPLabel && rowData[sourceIPLabel]){
        urlPath.push('source_ip='+rowData[sourceIPLabel])
    }
    if(destIPLabel && rowData[destIPLabel]){
        urlPath.push('dest_ip='+rowData[destIPLabel])
    }
    if(destPortLabel && rowData[destPortLabel]){
        urlPath.push('dest_port='+rowData[destPortLabel])
    }
    urlPath = urlPath.join("&")
    return urlPath
}


export const searchInAgentData = (rowData, labelDict)=>{
    try{
        let urlPath = generateAgentRedirectionPathFromRow(
            rowData.originalRow || rowData,
            labelDict
        )
        let newWindowURL = new URL(window.location.href)
        newWindowURL.pathname = '/AGENT/agent/network_connections_table'
        newWindowURL.search = urlPath;
        newWindowURL = newWindowURL.toString()
        const newWindow=window.open(newWindowURL, '_blank', 'nopener,noreferrer');
        if(newWindow) { newWindow.opener = null; }
    }
    catch{
        console.log('Error in redirect to agent info')
    }
}