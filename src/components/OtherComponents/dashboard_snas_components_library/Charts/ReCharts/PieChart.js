import React from 'react';
import { PieChart, Pie,  Cell, Label, ResponsiveContainer } from 'recharts';

export function PieChartRe(props) {
    const COLORS = props.COLORS===undefined?[ '#00C49F', '#464458', '#f7b301','#f03f37',]:props.COLORS

    const chartData = props.chartData
    const CustomLabelTwoLine = ({ viewBox, text1,  text2, }) => {
        const { cx, cy } = viewBox;
        return (
            <g>
                <text
                    x={cx}
                    y={cy-10}
                    className="recharts-text recharts-label"
                    textAnchor="middle"
                    dominantBaseline="central"
                    alignmentBaseline="middle"
                    fontSize="2.2rem"
                    fontWeight="60"
                >
                    {text1}
                </text>
                <text
                    x={cx}
                    y={cy + 30}
                    className="recharts-text recharts-label"
                    textAnchor="middle"
                    dominantBaseline="central"
                    alignmentBaseline="middle"
                    fill="#0088FE"
                    fontSize="1.1rem"
                >
                    {text2}
                </text>
            </g>
        );
    };

    const CustomLabelOneLine = ({ viewBox, text1 }) => {
        const { cx, cy } = viewBox;
        return (
            <g>
                <text
                    x={cx}
                    y={cy}
                    className="recharts-text recharts-label"
                    textAnchor="middle"
                    dominantBaseline="central"
                    alignmentBaseline="middle"
                    fontSize="10%"
                    // fontWeight="60"
                >
                    {text1}
                </text>
            </g>
        );
    };

    return (
        <ResponsiveContainer width={'100%'} >
            <PieChart >
                <Pie
                    data={chartData}
                    cx={'50%'}
                    cy={'50%'}
                    // startAngle={180}
                    // endAngle={0}
                    innerRadius={'67%'}
                    outerRadius={'90%'}
                    fill="#8884d8"
                    paddingAngle={1}
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            // style={{
                            //   filter: `drop-shadow(1px 1px 2px grey`
                            // }}
                        />
                    ))}
                    {
                    props.centerLabels?
                        props.centerLabels.length===1?
                            <Label
                                content={
                                    <CustomLabelOneLine text1={props.centerLabels[0]}  />
                                }
                                position="center"
                            />
                        :
                            <Label
                                content={
                                    <CustomLabelTwoLine text1={props.centerLabels[0]} text2={props.centerLabels[1]} />
                                }
                                position="center"
                            />
                    :null
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
