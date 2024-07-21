const getServerUTCTime = async ()=>{
    let  serverResponse  = await window.fetch_post_json_async(
        window.dashboardConfig.API_URL,
        'main/getserverutctime',
        {},
    )
    if('date' in serverResponse){
        return serverResponse['date']
    }
    return null
}

export const syncTimeWithServer = async (postSync = null) => {
    let time_diff = []
    for (let i = 0; i < 10; i+=1) {
        let serverDateTime = getServerUTCTime()
        if(serverDateTime){
            serverDateTime = new Date(serverDateTime)                  
            let localDateTime = new Date()
            time_diff.push( ( localDateTime.getTime() - serverDateTime.getTime()) ) 
        }
    }
    time_diff = time_diff.reduce( (a,b)=>(a+b) , 0  ) / time_diff.length
    time_diff = Math.ceil(time_diff/1000)
}

export const getCurrentClientTime = (time_type='local', data_type='string')=>{
    // time_type can be  'local' or 'utc' or 'epoch'
    // data_type can be 'string' or 'date'
    let localDate = new Date()
    if(time_type==='local'){
        if(data_type === 'string'){
            localDate.setMinutes(localDate.getMinutes() -  localDate.getTimezoneOffset())
            localDate = localDate.toISOString()
            localDate = localDate.substring(0,19)
        }
        else{
            // If data_type==='date'
        }
    }
    else if(time_type==='utc'){
        if(data_type === 'string'){
            localDate = localDate.toISOString()
            localDate = localDate.substring(0,19)
        }
        else{
            localDate = localDate.toISOString()
            localDate = localDate.substring(0,19)
            localDate = new Date(localDate)
        }
    }
    else{
        return localDate.getTime() // Epoch
    }
    return localDate
}

export const getCurrentServerTime = async(time_type='local', data_type='string')=>{
    // type can be 'local' or 'utc'
    let serverTime = await getServerUTCTime()
    // console.log('getServerUTCTime', serverTime)

    if(time_type === 'local'){
        if(data_type === 'string'){
            serverTime = new Date(serverTime)
            serverTime.setMinutes(serverTime.getMinutes() -  serverTime.getTimezoneOffset())
            serverTime = serverTime.toISOString()
            serverTime = serverTime.substring(0,19)
        }
        else{
            serverTime = new Date(serverTime)
        }
    }
    else if(time_type === 'utc'){
        if(data_type === 'string'){
            serverTime = serverTime.substring(0,19)
        }
        else{
            serverTime = new Date(serverTime)
            serverTime = serverTime.toISOString()
            serverTime = serverTime.substring(0,19)
            serverTime = new Date(serverTime)
        }
    }
    else{
        serverTime = new Date(serverTime)
        serverTime = serverTime.getTime()
    }
    return serverTime
}