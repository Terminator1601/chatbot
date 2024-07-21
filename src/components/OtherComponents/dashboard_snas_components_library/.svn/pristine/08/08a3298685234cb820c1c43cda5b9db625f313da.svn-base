import React from 'react'
import Chart from 'react-apexcharts'
import { DFC_convertDataToSeparateLabelsValuesArray } from '../../DataFormatConverter'

export function SuiDonutChart(props) {
    const chartConfig = props.chartConfig
    const { labels, values } = DFC_convertDataToSeparateLabelsValuesArray(props.chartData, chartConfig?.graphAxis)

    // alert(JSON.stringify(props))
    //   const series = values
    const series = values

    
    const onLabelClick = (type, label, date) =>{
        props.onLabelClick && (props.onLabelClick instanceof Function) && props.onLabelClick({ type, label, date })
    }

    const options = {
        chart: {
            type: 'donut',
            events: {
                legendClick: function (chartContext, seriesIndex, config) {
                    onLabelClick('legend_click', labels[seriesIndex])
                },
                // mouseMove: function(event, chartContext, config) {
                //   alert('mouse move')
                //   // getting mouse move
                // },
                // click: function(event, chartContext, config) {
                //   alert('click')
                // },
                // xAxisLabelClick: function(event, chartContext, config) {
                //   alert('xAxisLabelClick')
                // },
                // selection:function(chartContext, {xaxis, axis}){
                //   alert('selection')
                // },
                dataPointSelection: (event, chartContext, config) => {
                    onLabelClick('data_point_selection', labels[config.dataPointIndex])
                },
                // markerClick: function(event, chartContext, { seriesIndex, dataPointIndex, config}) {
                //   alert('markerClick')
                // }
            },
        },
        labels: labels,
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
            onItemClick: {
                toggleDataSeries: false,
            },
            onItemHover: {
                highlightDataSeries: false,
            },
            // position:'bottom',
            formatter: (seriesName, opts) => {
                return [seriesName, "-", opts.w.globals.series[opts.seriesIndex]]
            },
        },
        colors: window.dashboardConfig.WIDGET_COLORS
    }

    if (!(labels || values)){
        return <div className='pt-5 d-flex justify-content-center'>No data</div>
    }
    return (
        <div id="chart" className='w-100 h-100' >
            <Chart options={options} series={series} type="donut" height={'90%'} />
        </div>
    );
}

