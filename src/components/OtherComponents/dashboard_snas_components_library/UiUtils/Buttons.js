export const SuiButton = ( props)=> <button
    className='btn btn-sm btn-app-color'
    style={{ fontSize: props.fontSize || '15px', width: props.width || undefined, minWidth: props.minWidth || '100px' }}
    onClick={props.onClick}
>
    {props.label || "Apply"}
</button>