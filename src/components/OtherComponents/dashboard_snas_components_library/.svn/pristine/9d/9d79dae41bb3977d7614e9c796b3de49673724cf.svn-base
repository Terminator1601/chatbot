import React, { useCallback, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { DFC_convertDataIntoSeriesArray } from '../../DataFormatConverter'

export function SuiStackedTimelineChart(props) {
    const chartConfig = props.chartConfig || {}
    const chartData = DFC_convertDataIntoSeriesArray(props.chartData, chartConfig?.graphAxis)
    // const [chartData, setChartData] = useState({series:[]})
    const [chartClickData, setChartClickData] = useState({})

    const onLabelClick = (type, label, date) => {
        props.onLabelClick && (props.onLabelClick instanceof Function) && props.onLabelClick({ type, label, date })
    }

    useEffect(()=>{
        if(chartClickData.type==='marker_click'){
            const {seriesIndex, dataPointIndex} = chartClickData
            if (chartData.series && chartData.series[seriesIndex] && chartData.series[seriesIndex].data) {
                const value = chartData.series[seriesIndex].name;
                const date = chartData.series[seriesIndex].data[dataPointIndex][0];
                onLabelClick('marker_click', date, date);
            } else {
                console.error('Series or data point is undefined');
            }
        }
    }, [chartClickData])

    let options = {
        chart: {
            animations: {
                enabled: false,
            },
            // id: 'area-datetime',
            type: 'area',
            //   height: 350,
            zoom: {
                enabled: false,
                autoScaleYaxis: true
            },
            // events: {
            //   xAxisLabelClick: function(event, chartContext, config) {
            //     alert('hi')
            //   },
            //   zoomed: function(chartContext, { xaxis, yaxis }) {
            //     alert( JSON.stringify(xaxis))
            //   }
            // },
            // animations: {
            //   enabled: false,
            // }

            events: {
                click: function (event, chartContext, config) {
                    // Determine if an x-axis label was clicked
                    // const label = event?.target?.textContent
                    if (event.target.closest('.apexcharts-reset-icon')) {
                        onLabelClick('reset', null)
                    }
                },
                // legendClick: function (chartContext, seriesIndex, config) {
                //   console.log('legendClick')
                // },
                // mouseMove: function(event, chartContext, config) {
                //   alert('mouse move')
                //   // getting mouse move
                // },
                // click: function(event, chartContext, config) {
                //   alert('click')
                // },
                xAxisLabelClick: function (event, chartContext, config) {
                    let label = event?.target?.textContent
                },
                // selection: function (chartContext, { xaxis, axis }) {
                //   console.log('selection')
                // },
                // dataPointSelection: (event, chartContext, config) => {
                //   // props.widgetData.onClick({type:'label_index', 'label_index':config.dataPointIndex})
                //   // if(props.widgetData.onClick){
                //   //   props.widgetData.onClick({type:'label_name', 'label_name':props.widgetData.chartData.labels[config.dataPointIndex]})
                //   // }
                //   console.log('click')
                // },
                markerClick: function (event, chartContext, { seriesIndex, dataPointIndex, config }) {
                    setChartClickData({type:'marker_click', seriesIndex, dataPointIndex })
                },
            }
        },
        yaxis: {
            labels: {
                formatter: chartConfig?.labelFormatterFunc ? chartConfig?.labelFormatterFunc : undefined
            },
            min: chartConfig?.minYAxis ,
            max: chartConfig?.maxYAxis ,
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 5,
            style: 'hollow',
        },
        xaxis: {
            type: 'datetime',
            //   min: new Date('01 Mar 2012').getTime(),
            tickAmount: 6,
            labels: {
                datetimeUTC: false
            },
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy HH:mm:ss'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
        colors: window.dashboardConfig.WIDGET_COLORS
    }

    if (chartConfig.labelFormatterFunc) {
        if (!('yaxis' in options)) {
            options['yaxis'] = { 'labels': {} }
        }
        else if (!('labels' in options['yaxis'])) {
            options['yaxis']['labels'] = {}
        }
        options['yaxis']['labels']['formatter'] = function (value) {
            return chartConfig.labelFormatterFunc(value);
        }
    }

    if (chartConfig.yAxisLabel) {
        options['yaxis']['title'] = { text: chartConfig.yAxisLabel }
    }

    if (!( chartData?.series )){
        return <div className='pt-5 d-flex justify-content-center'>No data</div>
    }

    return (
        <div id="chart" className='w-100  h-100'>
            <div id="chart-timeline" className='w-100  h-100'>
                <Chart options={options} series={chartData.series} type="area" height={'90%'} />
            </div>
        </div>
    );
}
