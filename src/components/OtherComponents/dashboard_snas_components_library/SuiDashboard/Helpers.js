

export const separateSingleStatsFromOtherWidgets = (widgetsConfig)=>{
    let singleStatsConfig = widgetsConfig.filter(item=>item.chartType === 'single_stat')
    widgetsConfig = widgetsConfig.filter(item=>item.chartType !== 'single_stat')
    return {singleStatsConfig, widgetsConfig}
}