

export function array_of_array_to_array_of_obj(propsTableRows, propsTableColumns, type_columns) {
    let columns = []
    if (Array.isArray(propsTableColumns) && propsTableColumns.length > 0 && (typeof propsTableColumns[0] === 'string' || propsTableColumns[0] instanceof String)) {
        columns = propsTableColumns
    }
    else {
        columns = propsTableColumns.map((item) => item.field)
    }
    return propsTableRows.map((data_row) => {
        let new_row = {}
        columns.map((column_name, index) => {
            new_row[column_name] = data_row[index]
            return null
        })
        return new_row
    })
}

export function columns_array_to_array_of_objects(columns_array) {
    return columns_array.map((column_name) => ({ 'title': column_name, 'field': column_name }))
}

export function numberToBytes(value) {
    if (isNaN(value)) {
        return value
    }
    let x = Math.round(value / 1073741824)
    if (x > 1) {
        return x + ' GB'
    }
    else {
        x = Math.round(value / 1048576)
        if (x > 1) {
            return x + ' MB'
        }
        else {
            x = Math.round(value / 1024)
            if (x > 1) {
                return x + ' KB'
            }
            else {
                return value + ' B'
            }
        }
    }
}

export function numberToBits(value) {
    if (isNaN(value)) {
        return value
    }
    let x = Math.round(value / 1073741824)
    if (x > 1) {
        return x + ' Gb'
    }
    else {
        x = Math.round(value / 1048576)
        if (x > 1) {
            return x + ' Mb'
        }
        else {
            x = Math.round(value / 1024)
            if (x > 1) {
                return x + ' Kb'
            }
            else {
                return value + ' b'
            }
        }
    }
}

export function BytesToNumber(value) {
    if (value) {
        let x = value.toString()
        if (x.endsWith('TB')) {
            return Math.round(parseFloat(x.replace('GB', '')) * 1073741824 * 1024)
        }
        else if (x.endsWith('GB')) {
            return Math.round(parseFloat(x.replace('GB', '')) * 1073741824)
        }
        else if (x.endsWith('MB')) {
            return Math.round(parseFloat(x.replace('MB', '')) * 1048576)
        }
        else if (x.endsWith('KB')) {
            return Math.round(parseFloat(x.replace('KB', '')) * 1024)
        }
        else if (x.endsWith('B')) {
            return Math.round(parseFloat(x.replace('B', '')))
        }
        else {
            return 0
        }
    }
}

export function getDatetimeLabelFromDateRange(startDate, endDate) {
    let label = startDate
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    // startDate.setHours(startDate.getHours() + 5)
    // startDate.setMinutes(startDate.getMinutes() + 30) 
    // endDate.setHours(endDate.getHours() + 5)
    // endDate.setMinutes(endDate.getMinutes() + 30)
    if (startDate.toLocaleDateString() === endDate.toLocaleDateString()) {
        label = startDate.toDateString() + ' , ' + startDate.toLocaleTimeString() + ' to ' + endDate.toLocaleTimeString()
    }
    else {
        label = startDate.toDateString() + ' to ' + endDate.toDateString()
    }
    return label
}


export const DFC_convertDataIntoSeriesArray = (data, graph_axis={}) => {
    if (!data){
        return {series:[]}
    }
    if (graph_axis.x && graph_axis.label && graph_axis.val){
        if(Array.isArray(data)){
            let series = {}
            let series_total = {}
            data.forEach(item=>{
                if(item[graph_axis.label] && item[graph_axis.x] && item[graph_axis.val] ){
                    if (! series[item[graph_axis.label]]){
                        series[item[graph_axis.label]] = []
                        series_total[item[graph_axis.label]] = 0
                    }
                    series_total[item[graph_axis.label]] += item[graph_axis.val]
                    series[item[graph_axis.label]].push([item[graph_axis.x], item[graph_axis.val]])
                }
            })
            series_total = Object.entries(series_total).sort((a, b) => b[1] - a[1]).map(entry => entry[0]);
            let temp = []
            for (let key of series_total) {
                let data = series[key]
                data.sort((a, b) => {
                    let dateA = new Date(a[0]);
                    let dateB = new Date(b[0]);
                    return dateA - dateB;
                });
                temp.push({ 'name': key, 'data': data })
            }
            return { series: temp }
        }
    }

    try {
        let temp = []
        if (Array.isArray(data)) {
            // Assumming that the either of the first 2 index will contain date, and key, and the third index will contain value
            let date_position = 0
            let key_position = 1
            if (data.length > 0) {
                if (isNaN(data[0][1]) && (new Date(data[0][1])) != "Invalid Date") {
                    date_position = 1
                    key_position = 0
                }
            }
            let series = {}
            data.forEach((item) => {
                if (!(item[key_position] in series)) {
                    series[item[key_position]] = []
                }
                series[item[key_position]].push([item[date_position], item[2]])
            })
            temp = []
            for (let key in series) {
                temp.push({ 'name': key, 'data': series[key] })
            }
        }
        else {
            temp = data
            let series = {}
            for (let key in temp) {
                let sub_distribution = temp[key]
                for (let sub_key in sub_distribution) {
                    if (!(sub_key in series)) {
                        series[sub_key] = []
                    }
                    series[sub_key].push([parseInt(key), sub_distribution[sub_key]])
                }
            }
            temp = []
            for (let key in series) {
                temp.push({ 'name': key, 'data': series[key] })
            }
        }
        return { series: temp }
    }
    catch (err) {
        return { series: [] }
    }
}

// export const DFC_convertDataToSeparateLabelValueArray = (data) => {
//     try {
//         let labels = []
//         let values = []
//         if (Array.isArray(data)) {
//             data.forEach((item) => {
//                 if(item[0]){
//                     labels.push(item[0])
//                 }
//                 else{
//                     labels.push(JSON.stringify(item[0]))
//                 }
//                 values.push(item[1])
//             })
//         }
//         else {
//             Object.keys(data).forEach((key) => {
//                 if(key){
//                     labels.push(key)
//                 }
//                 else{
//                     labels.push(JSON.stringify(key)) 
//                 }
//                 values.push(data[key])
//             })
//         }
//         return { labels: labels, values: values }
//     }
//     catch (err) {
//         console.log('Error is creating chart Data', err)
//         return { labels: [], values: [] }
//     }
// }

export const convertResponseToTableFormat = (response) => {
    try {
        if ('columns' in response && ('data' in response)) {
            let rows = array_of_array_to_array_of_obj(response.data, response.columns)
            let columns = columns_array_to_array_of_objects(response.columns)
            return { tableRows: rows, tableColumns: columns }
        }
        else {
            return null
        }
    }
    catch (err) {
        return null
    }
}

let connStateMapToUFName = {
    S0: {'keyword':'attempt with no response', 'description':''}, // Connection attempt seen, no reply.
    S1: {'keyword':'established', 'description':''},// Connection established, not terminated.
    S2: {'keyword':'established and closed by originator', 'description':''}, //Connection established and close attempt by originator seen (but no reply yet).
    S3: {'keyword':'established and closed by responder', 'description':''}, //Connection established and close attempt by responder seen (but no reply yet).
    SF: {'keyword':'established and terminated', 'description':''}, //Normal established connection, both endpoints completed (handshake done).
    REJ: {'keyword':'attempt rejected', 'description':''},//Connection attempt rejected.
    RSTO: {'keyword':'established and reset by originator', 'description':''}, //Connection established, originator aborted (sent a reset).
    RSTR: {'keyword':'established and reset by responder', 'description':''}, //Established connection, responder aborted (sent a reset).
    RSTOS0: {'keyword':'originator sent SYN then RST, no response from responder', 'description':''},//Originator sent a SYN followed by a RST, but no response from the responder.
    RSTRH: {'keyword':'responder sent SYN ACK then RST', 'description':''},//Responder sent a SYN ACK followed by a RST, indicating a host error.
}

export const getUFConnState=(connState)=>{
    return connStateMapToUFName[connState] ?  connStateMapToUFName[connState]['keyword']+ '(' + connState + ')' : connState
}

export const keyToLabel = (key)=>{
    if(key){
        return key.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' '); // Join the words with a space
    }
    return key
}


export const DFC_convertDataToSeparateLabelsValuesArray = (data, graph_axis={})=>{
    let labels = []
    let values = []

    if(! data){
        return {labels, values}
    }
    if( Array.isArray(data?.labels) && Array.isArray(data?.values)){
        return data
    }
    if( Array.isArray(data) && data.length > 0){
        if (! (graph_axis.label || graph_axis.val)){
            console.log(data)
            for (let key in data[0]){
                if (Number.isInteger(data[0][key])){
                    graph_axis.val = key
                }
            }
            for (let key in data[0]){
                if (graph_axis.val !== key){
                    graph_axis.label = key
                }
            }
        }
        if (graph_axis.label && graph_axis.val){
            let sort_on = 'val'
            if (graph_axis.sort_on == 'label'){
                sort_on =  'label'
            }
            else if(isNaN(data[0]['label']) && (new Date(data[0]['label'])) != "Invalid Date"){
                sort_on =  'label'
            }
            data.sort((a, b) => {
                return b[graph_axis[sort_on]] - a[graph_axis[sort_on]];
            });
            labels = data.map((item)=>item[graph_axis.label])
            values = data.map((item)=>item[graph_axis.val])
        }
        else if (Array.isArray(data[0])){
            let date_position = 0
            let value_position = 1
            if (isNaN(data[0][1]) && (new Date(data[0][1])) != "Invalid Date") {
                value_position = 1
                date_position = 0
            }
            labels = data.map((item)=>item[date_position])
            values = data.map((item)=>item[value_position])
        }
    }
    else if (typeof data === 'object'){
        Object.keys(data).forEach((key) => {
            if(key){
                labels.push(key)
            }
            else{
                labels.push(JSON.stringify(key)) 
            }
            values.push(data[key])
        })
    }
    return {labels, values}
}