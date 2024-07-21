import React, { useEffect } from 'react'

export default function RightClickContextMenu({contextMenu, contextMenuConfig, setContextMenuConfig}) {
    
  return (
    <div className="app-dark-background-color cursor-pointer p-4 shadow-lg rounded" style={{ position: 'absolute', left: contextMenuConfig.x, top: contextMenuConfig.y, minWidth: '100px' }}>        {
           Array.isArray(contextMenu) && contextMenu.map(item=>{
            return <div onClick={()=>{item.onClick(item.label, contextMenuConfig.rowData); setContextMenuConfig({showContextMenu:false})}}>
                {item.label}
            </div>
           })
        }
    </div>
  )
}