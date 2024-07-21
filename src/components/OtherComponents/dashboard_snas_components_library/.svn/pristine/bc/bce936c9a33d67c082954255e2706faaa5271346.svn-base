import React from 'react'
import Chart from 'react-apexcharts'
import { DFC_convertDataToSeparateLabelsValuesArray } from '../../DataFormatConverter'

export function SuiBarChart(props) {
    const chartConfig = props.chartConfig || {}
    const { labels, values } = DFC_convertDataToSeparateLabelsValuesArray(props.chartData, chartConfig.graphAxis)

    let chartType =  props.chartType || 'bar'
    let isHorizontal = false
    if(props.chartType === 'horizontal_bar'){
        chartType = 'bar'
        isHorizontal = true
    }
    const series = [{
        name: props.seriesName || 'count',
        data: values
    }]

    const onLabelClick = (type, label) =>{
        props.onLabelClick && props.onLabelClick({ type, label })
    }

    const options = {
        chart: {
            type: chartType,
            toolbar: {
                show: false
            },
            events: {
                click: function (event, chartContext, config) {
                    if (event.target.closest('.apexcharts-reset-icon')) {
                        onLabelClick('reset',null)
                    }
                },
                xAxisLabelClick: function (event, chartContext, config) {
                    let label = event?.target?.textContent
                    label && onLabelClick( 'x_axis_label_click', label )
                },
                dataPointSelection: (event, chartContext, config) => {
                    onLabelClick('data_point_selection', labels[config.dataPointIndex] )
                },
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
            categories: labels,
            labels: {
                show: true,
                // datetimeUTC: false
            },
            title: chartConfig.xaxislabel ? { text:chartConfig.xaxislabel } : {}
        },
        yaxis: {
            title: chartConfig.yaxislabel ? { text:chartConfig.yaxislabel } : {}
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
        plotOptions: {
            bar: {
                borderRadius: 4,
                // horizontal: true,

                // dataLabels:{
                //   position:'top',
                // }
            }
        },

    }

    if (chartConfig.labelFormatterFunc) {
        if (!('dataLabels' in options)) {
            options['dataLabels'] = {}
        }
        options['dataLabels']['formatter'] = function (value) {
            return chartConfig.labelFormatterFunc(value);
        }
    }
    if (chartType.includes('bar')) {
        options['plotOptions'] = {
            'bar': {
                borderRadius: 4,
            }
        }
        let barWidthKeyword = 'columnWidth'

        if(isHorizontal){
            barWidthKeyword = 'barHeight'
            options['plotOptions']['bar']['horizontal'] = true
            options['xaxis']['labels']['show'] = false
            options['dataLabels']['enabled'] = true
        }

        if (labels.length <= 5) {
            options['plotOptions']['bar'][barWidthKeyword] = '30px'
        }
        else {
            options['plotOptions']['bar'][barWidthKeyword] = '90%'
        }
    }
    
    if (Array.isArray(labels) && Array.isArray(values) && values.length > 0 && !isNaN(values[0]) && labels.length>0 && labels[0]){
        return         <div className='w-100 h-100' >
        <Chart options={options} series={series} type={chartType} height={'90%'} />
    </div> 
    }

    return (
        <div className='pt-5 d-flex justify-content-center'>No data</div>
    )
}

