import React, { useEffect, useState } from 'react'
import Maps from './Maps'
import { numberToBytes } from '../../DataFormatConverter'

export function SuiMaps(props) {

  const [countryDict, setCountryDict] = useState({})

  const extractCountriesList = (propsCountryDict) => {
    let tempCountryDict = propsCountryDict
    let sortable = [];

    for (var country_code in tempCountryDict) {
      sortable.push([country_code, tempCountryDict[country_code]['traffic']]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    // tempCountryDict = new Map()
    // for(let row of sortable){
    //   tempCountryDict.set(row[0], row[1])
    // }
    tempCountryDict = {}
    for (let row of sortable) {
      tempCountryDict[row[0]] = { ...propsCountryDict[row[0]], extraLabel:numberToBytes(row[1]) + ', ' + propsCountryDict[row[0]]['session'] + ' sessions', fill: colorCalculator(row[1]) }
    }
    if (propsCountryDict) {
      setCountryDict(tempCountryDict)
    }
    // let alpha23 = {}
    // for(let i in country_list){
    //   alpha23[country_list[i]['alpha2']] = country_list[i]['name']
    // }
    // alert(JSON.stringify(alpha23))
  }

  const chartData = props.chartData

  useEffect(() => {
    const countryDict = {}
    if(Array.isArray(chartData)){
      chartData.forEach(item=>{
          countryDict[item['d_country']] = { 'traffic':item['traffic'], 'session':item['doc_count'], 'country_code':item['d_country'] }
      })
    }
    extractCountriesList(countryDict)
  }, [chartData])

  const choroplethConfig = {
    categorisation: 'range', //or range
    range: [
      { lte: Infinity, gt: 1073731824, color: 'red' },
      { lte: 1073731824, gt: 1048576, color: 'orange' },
      { lte: 1048576, gt: 0, color: 'yellow' }
    ]
  }

  const colorCalculator = (value) => {
    let color = 'white'
    for (let row of choroplethConfig.range) {
      if (value > row['gt'] && value <= row['lte']) {
        color = row['color']
        break
      }
    }
    return color
  }
  const onLabelClick = (type, label, date) =>{
    props.onLabelClick && (props.onLabelClick instanceof Function) && props.onLabelClick({ type, label, date })
  }

  return (
    <>  
    {/* {JSON.stringify(chartData)}
    <hr/>
    {JSON.stringify(countryDict)}   */}
    <Maps countryDict={countryDict}
      onClick={(country_iso_code) => {
         onLabelClick('map_click', country_iso_code)
      }}
      height='80%'
    />
    </>
  )
}

