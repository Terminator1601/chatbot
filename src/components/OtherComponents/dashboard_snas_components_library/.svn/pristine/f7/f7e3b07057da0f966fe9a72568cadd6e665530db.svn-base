import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { DFC_convertDataToSeparateLabelsValuesArray } from '../../DataFormatConverter'

export function SuiTimelineChart(props) {
    const chartConfig = props.chartConfig || {}
    const { labels, values } = DFC_convertDataToSeparateLabelsValuesArray(props.chartData, chartConfig?.graphAxis)
    const [chartClickData, setChartClickData] = useState({})


    const chartType = props.chartType || 'bar'

    const series = [{
        name: props.seriesName || 'count',
        data: values
    }]

    const onLabelClick = (type, label, date) =>{
        props.onLabelClick && (props.onLabelClick instanceof Function) && props.onLabelClick({ type, label, date })
    }

    useEffect(()=>{
        if(chartClickData.type==='marker_click'){
            const {seriesIndex, dataPointIndex} = chartClickData
            if (labels[dataPointIndex]) {
                // const date = chartData.series[seriesIndex].data[dataPointIndex][0];
                onLabelClick('marker_click', labels[dataPointIndex]);
            } else {
                console.error('Series or data point is undefined');
            }
        }
    }, [chartClickData])

    const options = {
        chart: {
            type: chartType,
            //   toolbar:{
            //     show:false
            //   },
            zoom: {
                autoScaleYaxis: true
            },
            events: {
                click: function (event, chartContext, config) {
                    // Determine if an x-axis label was clicked
                    // const label = event?.target?.textContent
                    if (event.target.closest('.apexcharts-reset-icon')) {
                        onLabelClick('reset',null)
                    }
                },
                // dataPointMouseEnter: function (event, chartContext, config) {
                //     console.log('Data point mouse enter', config);
                // },
                // dataPointMouseLeave: function (event, chartContext, config) {
                //     console.log('Data point mouse leave', config);
                // },
                legendClick: function (chartContext, seriesIndex, config) {
                    // console.log('Legend clicked', seriesIndex, config);
                },
                markerClick: function (event, chartContext, { seriesIndex, dataPointIndex, config }) {
                    setChartClickData({type:'marker_click', dataPointIndex })
                },
                selection: function (chartContext, { xaxis, yaxis }) {
                    // console.log('Selection made', xaxis, yaxis);
                },
                updated: function (chartContext) {
                    // console.log('Chart updated');
                },
                //   legendClick: function(chartContext, seriesIndex, config) {
                //     alert('legendClick')
                //   },
                //   // mouseMove: function(event, chartContext, config) {
                //   //   alert('mouse move')
                //   //   // getting mouse move
                //   // },
                //   click: function(event, chartContext, config) {
                //     alert('click')
                //   },
                xAxisLabelClick: function (event, chartContext, config) {
                    let label = event?.target?.textContent
                    let date = labels[config.labelIndex]
                    label && onLabelClick( 'x_axis_label_click', label, date )
                },
                //   selection:function(chartContext, {xaxis, axis}){
                //     alert('selection')
                //   },
                dataPointSelection: (event, chartContext, config) => {
                    // console.log('data')
                    onLabelClick('data_point_selection', labels[config.dataPointIndex] )
                },
                //   markerClick: function(event, chartContext, { seriesIndex, dataPointIndex, config}) {
                //     alert('markerClick')
                //   }
            }
        },
        // labels:props.widgetData.data.labels?props.widgetData.data.labels:[],
        dataLabels: {
            enabled: false,
            // offsetX:-6,
            style: {
                colors: ['rgb(100, 100, 100)']
            },
            textAnchor: 'start'
        },
        xaxis: {
            type: 'datetime',
            categories: labels,
            labels: {
                show: true,
                datetimeUTC: false
            }
        },
        // legend:{
        //   show:true,
        //   onItemClick:{
        //     toggleDataSeries:false,
        //   },
        //   onItemHover:{
        //     highlightDataSeries:false,
        //   },
        //   // position:'bottom',
        //   formatter:(seriesName, opts)=>{
        //     return [seriesName, "-", opts.w.globals.series[opts.seriesIndex]]
        //   },
        // },
        // plotOptions: {
        //     bar: {
        //         borderRadius: 4,
        //         // horizontal: true,
        //         // dataLabels:{
        //         //   position:'top',
        //         // }
        //     }
        // },
    }
    if (props.labelFormatterFunc) {
        if (!('dataLabels' in options)) {
            options['dataLabels'] = {}
        }
        options['dataLabels']['formatter'] = function (value) {
            return props.widgetData.labelFormatterFunc(value);
        }
    }
    if (chartType.includes('bar')) {
        options['plotOptions'] = {
            'bar': {
                borderRadius: 4,
            }
        }
        if (labels.length <= 5) {
            options['plotOptions']['bar']['columnWidth'] = '30px'
        }
        else {
            options['plotOptions']['bar']['columnWidth'] = '90%'
        }
    }

    // const [renderChart, setRenderChart] = useState(false)
    // useEffect(() => {
    //     setTimeout(() => {
    //         setRenderChart(true)
    //     }, 200);
    // }, [])
    if (!(labels || values)){
        return <div className='pt-5 d-flex justify-content-center'>No data</div>
    }

    return (
        <div className='w-100 h-100' >
            {/* {
                renderChart ? */}
                    <Chart options={options} series={series} type={chartType} height={'90%'} />
                    {/* : null */}
            {/* } */}
            {/* chartData:{JSON.stringify(props.chartData)} */}
        </div>
    )
}