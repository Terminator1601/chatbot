import React from 'react'
import { Responsive } from "react-grid-layout";
import { WidthProvider } from "react-grid-layout";
import { separateSingleStatsFromOtherWidgets } from './Helpers'
import { TopStatsDisplay } from './TopStatsDisplay'
import SuiWidget from './Widget';
import 'react-grid-layout/css/styles.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function SuiDashboard(props) {
  let propsWidgetsConfig = Array.isArray(props.widgetsConfig) ? props.widgetsConfig : []
  let { singleStatsConfig, widgetsConfig } = separateSingleStatsFromOtherWidgets(propsWidgetsConfig)
  const margin = 15
  let minWidgetHeight = ((window.innerWidth - margin * 13) / 12) * 1.2 

  return (
    <div>
      <TopStatsDisplay singleStatsConfig={singleStatsConfig} />
      {/* {JSON.stringify(widgetsConfig)} */}
      <div className='row px-4'>
        <ResponsiveReactGridLayout
          // onLayoutChange={onLayoutChange}
          // onBreakpointChange={this.refreshLayoutFunc}
          margin={[margin, margin]}
          isDraggable={false}
          isResizable={false}
          // style={{marginTop:-this.props.dashboardState.dimensions.marginY}}
          rowHeight={minWidgetHeight}
          className={"layout"}
          cols={{ lg: 12, md: 12, sm: 6, xs: 3, xxs: 1 }}
        >
          {
            widgetsConfig.map((widgetConfig, index) => {
              return <div  key={'dashboard-widget-' + index} data-grid={widgetConfig?.data_grid}>
                {widgetConfig && <SuiWidget widgetConfig={widgetConfig} />}
                {/* {JSON.stringify(widgetConfig)} */}
                {/* Hello */}
              </div>
            })
          }
        </ResponsiveReactGridLayout>
      </div>

    </div>
  )
}