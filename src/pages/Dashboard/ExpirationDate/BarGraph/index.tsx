import React from "react";
import {
    BarChart, 
    Bar, 
    Cell, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    LabelList, 
    ResponsiveContainer,
} from 'recharts';
import {EnumAppColors} from "../../../../constants";
import _ from 'lodash';

// types
import {BarGraphProps} from "./types";

// styles
import {BarGraphView} from "./styles";

export default function BarGraph(props: BarGraphProps) {
    const {product} = props;
    
    const data = [
        {
            name: "Lotes cadastrados",
            qtd: Number(product.registered_lots_quantity),
            color: EnumAppColors.BLUE,
        },
        {
            name: "Lotes esgotados",
            qtd: Number(product.exhausted_lots_quantity),
            color: EnumAppColors.ERROR,
        },
    ];

    function handlePvBarClick(data: any, index: number, e: React.MouseEvent) {
        console.log(`Pv Bar (${index}) Click: `, data);
    };
    
    function handleBarAnimationStart() {
        console.log('Animation start');
    };
    
    function handleBarAnimationEnd() {
        console.log('Animation end');
    };

    return(
        <BarGraphView>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} onClick={handlePvBarClick}>
                <XAxis dataKey="name" />
                <YAxis yAxisId="a" />
                <Tooltip />
                <CartesianGrid vertical={false} />

                {/**<Legend /> */}
                <Bar yAxisId="a" dataKey="qtd" onAnimationStart={handleBarAnimationStart} onAnimationEnd={handleBarAnimationEnd}>
                    <LabelList fill="#ffffff" angle={-45} />
                    {data.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
        </BarGraphView>
    );
}