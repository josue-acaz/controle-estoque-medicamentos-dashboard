import React from "react";
import * as _ from "lodash";
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from "recharts";
import {EnumAppColors} from "../../../../constants";

// types
import {PieGraphProps} from "./types";

// styles
import {
    PieGraphView,
    PieLabelGraph, 
    PieLabelTitle, 
    PieLabelText,
} from "./styles";

export default function PieGraph(props: PieGraphProps) {
    const {product} = props;

    const data02 = [
        {   
            name: 'Validade vencida', 
            color: EnumAppColors.ERROR,
            value: Number(product.expired_quantity),
        },
        {
            name: 'Validade abaixo dos 30 dias', 
            color: EnumAppColors.ORANGE,
            value: Number(product.under_30_days_quantity),
        },
        {
            name: 'Validade acima dos 30 dias', 
            color: EnumAppColors.SUCCESS,
            value: Number(product.over_30_days_quantity),
        },
    ];

    function renderLabelContent(props: any) {
        const {value, percent, x, y, midAngle} = props;
    
        return (
            <PieLabelGraph transform={`translate(${x}, ${y})`} textAnchor={ (midAngle < -90 || midAngle >= 90) ? 'end' : 'start'}>
                <PieLabelTitle x={0} y={0}>{value}</PieLabelTitle>
                <PieLabelText x={0} y={20}>{`${(percent * 100).toFixed(2)}%`}</PieLabelText>
            </PieLabelGraph>
        );
    }

    return(
        <PieGraphView>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Legend verticalAlign="bottom" />
                    <Pie
                        data={data02}
                        dataKey="value"
                        startAngle={180}
                        endAngle={-180}
                        innerRadius={60}
                        outerRadius={100}
                        label={renderLabelContent}
                        paddingAngle={5}
                        isAnimationActive={true}
                    >
                        {data02.map((data, index) => (
                            <Cell key={index} fill={data.color}/>
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </PieGraphView>
    );
}