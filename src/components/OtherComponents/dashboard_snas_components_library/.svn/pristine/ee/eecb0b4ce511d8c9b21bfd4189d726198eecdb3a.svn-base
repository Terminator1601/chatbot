import GaugeChart from "react-gauge-chart";

export function SuiGaugeChart(props){
    return (
            <GaugeChart
                id="gauge-chart1"
                nrOfLevels={8}
                percent={props.percent}
                hideText={props.percent==='-'?true:false}
                textColor="black"
                needleBaseColor="#F35725"
                arcPadding={0.015}
                cornerRadius={0}
                arcWidth={0.19}
                formatTextValue={(value) => `${value}%`}
                needleColor={props.percent==='-'?'transparent':"#F35725"}
                colors={
                    props.COLORS==='light'?["#FCD9B2", "#FBC192", "#F9A974", "#F79054", "#F57732", "#F35825"]:
                    ["rgb(250, 200, 200)","#F6BDC0", "#F1959B", "#F07470", "#EA4C46", "#DC1C13"]
                }
                arcsLength={[0.075, 0.075, 0.075, 0.075, 0.075, 0.075,0.075, 0.075]}
            />
       )
}
