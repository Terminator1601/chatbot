import React, { useEffect } from 'react'
import { SuiTimelineChart } from './ApexCharts/TimelineChart'
import CytoscapeGraph from './OtherCharts/CytoscapeGraph.js'
import { SuiBarChart } from './ApexCharts/BarChart.js'
import { SuiStackedTimelineChart } from './ApexCharts/StackedTimelineChart.js'
import { SuiDonutChart } from './ApexCharts/DonutChart.js'
import { SuiMaps } from './Maps/MapWrapper.js'

export default function SUICharts(props) {
  const chartConfig = props?.chartConfig
  const chartType = props?.chartType
  const chartData = props?.chartData
  const xaxislabel = props?.chartConfig?.xaxislabel
  const yaxislabel = props?.chartConfig?.yaxislabel
  const onLabelClick = props?.onLabelClick
  return <div className='w-100 h-100'>
    {
      ['bar', 'area', 'line', 'horizontal_bar'].includes(chartType)
        ? <SuiBarChart chartData={chartData} chartType={chartType} onLabelClick={onLabelClick} xaxislabel={xaxislabel} yaxislabel={yaxislabel} chartConfig={chartConfig} />
        : chartType === 'bar_timeline'
          ? <SuiTimelineChart chartData={chartData} chartType={'bar'} onLabelClick={onLabelClick} xaxislabel={xaxislabel} yaxislabel={yaxislabel} chartConfig={chartConfig} />
          : chartType === 'area_timeline'
            ? <SuiTimelineChart chartData={chartData} chartType={'area'} onLabelClick={onLabelClick} xaxislabel={xaxislabel} yaxislabel={yaxislabel} chartConfig={chartConfig} />
            : chartType === 'stacked_area_timeline'
              ? <SuiStackedTimelineChart chartData={chartData} chartType={'area'} onLabelClick={onLabelClick} xaxislabel={xaxislabel} yaxislabel={yaxislabel} chartConfig={chartConfig} />
              : chartType === 'donut'
              ? <SuiDonutChart chartData={chartData} chartType={'area'} onLabelClick={onLabelClick} xaxislabel={xaxislabel} yaxislabel={yaxislabel} chartConfig={chartConfig} />
              : chartType === 'tree_chart'
                ? <CytoscapeGraph chartData={chartData} chartType={'area'} onLabelClick={onLabelClick} xaxislabel={xaxislabel} yaxislabel={yaxislabel} chartConfig={chartConfig} />
                : chartType === 'map'
                  ? <SuiMaps chartData={chartData} chartType={'map'} onLabelClick={onLabelClick} xaxislabel={xaxislabel} yaxislabel={yaxislabel} chartConfig={chartConfig} />
                  : null
    }
  </div>
  // return (
  //   props.requestData 
  //   ? <ChartSelectorWithFetch {...props} />
  //   :<ChartSelector {...props} />
  // )
}

function ChartSelector(props) {
  const chartType = props?.chartType
  const chartData = props?.chartData
  return <div className='w-100 h-100'>
    {
      chartType === 'bar_timeline'
        ? <SuiTimelineChart chartData={chartData} chartType={'bar'} />
        : chartType === 'area_timeline'
          ? <SuiTimelineChart chartData={chartData} chartType={'area'} />
          : null
    }
  </div>
}

