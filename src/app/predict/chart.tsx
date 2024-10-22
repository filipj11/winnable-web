"use client"

import React, { useRef, useState } from 'react';
import * as d3 from "d3";

interface ChartProps {
    winProb: number;
    time: number;
}

const Chart = ({time, winProb}: ChartProps) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [data, setData] = useState<{ time: number, probability: number}[]>([]);
    const [tooltip, setTooltip] = useState< { time: number, probability: number} | null>(null);

    const hasData = data.length > 0 && data[data.length - 1].time === time;

    const update = (time: number, winProb: number) => {
        if (!hasData) {
            setData((prevData) => [...prevData, { time: time, probability: winProb}]);
        }
        
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            const width = 500;
            const height = 300;
            const margin = { top: 20, right: 20, bottom: 30, left: 50 };

            svg.selectAll("*").remove();

            svg.attr("width", width)
            .attr("height", height);

            const xScale = d3.scaleLinear().domain([0, d3.max( data, (d: { time: number }) => d.time) || 0]).range([margin.left, width - margin.right]);

            const yScale = d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, margin.top]);

            const xAxis = d3.axisBottom(xScale).ticks(5);
            const yAxis = d3.axisLeft(yScale).ticks(5);

            svg.append("g").attr("transform", `translate(0, ${height - margin.bottom})`).call(xAxis);
            svg.append("g").attr("transform", `translate(${margin.left}, 0)`).call(yAxis);

            const line = d3.line<{ time: number; probability: number}>()
            .x( (d: { time: number; probability: number}) => xScale(d.time))
            .y( (d: { time: number; probability: number}) => yScale(d.probability));

            svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 3)
            .attr("d", line)
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut);

            const dots = svg.selectAll(".dot").data(data);

            dots.enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", (d: { time: number; probability: number }) => xScale(d.time))
            .attr("cy", (d: { time: number; probability: number }) => yScale(d.probability))
            .attr("r", 5)
            .attr("fill", "steelblue")
            .on("mouseover", (_event: MouseEvent, d: { time: number; probability: number }) => {
                setTooltip({ time: d.time, probability: d.probability });
            })
            .on("mouseout", () => {
                setTooltip(null)
            })
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut);

            dots.exit().remove();

            const tooltipDiv = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

            dots.on("mouseover", (event: MouseEvent, d: { time: number; probability: number }) => {
                tooltipDiv.transition()
                .duration(200)
                .style("opacity", 0.8);

                tooltipDiv.html(`Time: ${d.time}s<br/>Probability: ${d.probability}`)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 28}px`);
            })
            .on("mousemove", (event: MouseEvent) => {
                tooltipDiv.style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 28}px`);
            })
            .on("mouseout", () => {
                tooltipDiv.transition()
                .duration(500).
                style("opacity", 0);
            })
        }
    };

    update(time, winProb);

    return (
        <>
            <svg ref={svgRef}></svg>
            {tooltip && (
                <div className="tooltip" style={{
                    position: "absolute",
                    opacity: 0.8,
                    backgroundColor: "white",
                    border: "1px solid black",
                    padding: "5px",
                    borderRadius: "5px",
                    left: `${tooltip.time}px`,  // Adjust as necessary
                    top: `${tooltip.probability * 300}px` // Adjust as necessary
                }}>
                    <p>Time: {tooltip.time}s</p>
                    <p>Probability: {tooltip.probability}</p>
                </div>
            )}
        </>
    );
};
    
export default Chart;