'use client'

import * as d3 from "d3";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { useState } from "react";
import { InteractionInfo, Tooltip } from "./Tooltip";

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

type LineChartProps = {
    width: number;
    height: number;
    data: {x: number, y: number}[];
}

export const LineChart = ({ width, height, data }: LineChartProps) => {
    const boundsWidth = MARGIN.right - MARGIN.left;
    const boundsHeight = MARGIN.top - MARGIN.bottom;

    const [hovered, setHovered] = useState<InteractionInfo | null>(null);

    const yScale = d3.scaleLinear().domain([0, 100]).range([boundsHeight, 0]);
    const xScale = d3.scaleLinear().domain([0, 10000]).range([0, boundsWidth]);

    const shapes = data.map((d, i) => {
        return (
            <circle
                key={i}
                r={8}
                cx={xScale(d.x)}
                cy={yScale(d.y)}
                stroke="#cd1dd1"
                fill="#cd1dd1"
                fillOpacity={0.2}
                strokeWidth={1}
                onMouseEnter={() =>
                    setHovered({
                        xPos: xScale(d.x),
                        yPos: yScale(d.y),
                        text: `Win probability: ${d.x}` 
                    })
                }
                onMouseLeave={() =>
                    setHovered(null)
                }
            />
        );
    });

    return (
        <div style={{ position: "relative" }}>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth}/>
                    <g transform={`translate(0, ${boundsHeight})`}>
                        <AxisBottom
                            xScale={xScale}
                            pixelsPerTick={40}
                            height={boundsHeight}
                        />
                    </g>
                    {shapes}
                </g>
            </svg>
            <div
                style={{
                    width: boundsWidth,
                    height: boundsHeight,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    marginLeft: MARGIN.left,
                    marginTop: MARGIN.top,
                }}
            >
                <Tooltip interactionInfo={hovered} />
            </div>
        </div>
    )
};