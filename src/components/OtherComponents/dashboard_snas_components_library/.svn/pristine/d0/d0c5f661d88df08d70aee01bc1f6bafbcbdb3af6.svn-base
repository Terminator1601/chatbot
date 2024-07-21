import React from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import mapdata from './Mapdata'
import { country_alpha3_to_alpha2, country_alpha2_to_name } from './CountryData';
import 'flag-icons/css/flag-icons.min.css'
import { numberToBytes } from '../../DataFormatConverter';

function Maps(props) {
    const height = props.height ? props.height : '700px'
    const width = props.width ? props.width : '100%'

    const countryDict = props.countryDict
    
    return (
        <>
        
        <div className='row w-100 h-100 overflow-hidden m-0 p-0'>
            <div className='col col-3 d-flex align-items-center  h-100' >
                <div className='w-100 overflow-auto  p-2' style={{ height: '90%' }}>
                    <div className='w-100  ' >
                        {
                            Object.keys(countryDict).map((country_code, index) => {
                                return <div
                                    className='w-100 shadow rounded mt-3 p-2 w-100  cursor-pointer'
                                    style={{ backgroundColor: 'rgb(200, 200, 250)' }}
                                    onClick={() => { props.onClick(country_code) }}
                                >
                                    <div className='d-flex align-items-center'>
                                        <div className='flex-grow-1'>
                                            <div className=''>{ (index+1) + ":  "+  country_alpha2_to_name[country_code] }</div>
                                            <div>{" " + countryDict[country_code]['extraLabel']}</div>
                                        </div>
                                        <div>
                                            <div className={' me-2 fi fi-' + country_code.toLowerCase()} style={{fontSize:'30px'}}></div>
                                        </div>
                                    </div>


                    
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='col col-9 h-100'>
                <div
                    className='w-100 h-100 overflow-auto'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div className='col-8 app-dark-background-color shadow border border-2  rounded-5 p-3' style={{ width: width, height: height, backgroundColor: 'rgba(10,200,255,0.2)' }}>
                        <div className=' overflow-auto h-100' >
                            <ComposableMap
                                projection='geoMercator'
                                style={{ color: 'white' }}
                                projectionConfig={{
                                    scale: 100,
                                    // center: [74, 20],
                                }}
                                fill='white'
                                stroke='black'
                                strokeWidth={0.5}
                            >
                                <Geographies geography={mapdata.data}>
                                    {(geographies) => {
                                        return geographies.geographies.map((geo) => {
                                            return <Geography
                                                fill={country_alpha3_to_alpha2[geo.id] in countryDict ? countryDict[country_alpha3_to_alpha2[geo.id]]['fill'] : 'white'}
                                                key={geo.rsmKey}
                                                geography={geo}
                                                onClick={() => { props.onClick(country_alpha3_to_alpha2[geo.id]) }}
                                            />
                                        })
                                    }}
                                </Geographies>
                            </ComposableMap>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Maps