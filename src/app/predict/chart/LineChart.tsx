'use client';

import * as d3 from "d3";
import { useMemo, useState } from "react";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { InteractionInfo, Tooltip } from "./Tooltip";

export interface ChartDimensions {
	width?: number;
	height?: number;
	marginTop?: number;
	marginRight?: number;
	marginBottom?: number;
	marginLeft?: number;
	boundedHeight?: number;
	boundedWidth?: number;
}

type LineChartProps = {
	data: { x: number, y: number; }[],
	dims: ChartDimensions;
};

export const LineChart = ({ data, dims }: LineChartProps) => {
	const [hovered, setHovered] = useState<InteractionInfo | null>(null);

	const xScale = useMemo(() => (
		d3.scaleLinear()
			.domain([0, 100000])
			.range([0, dims.boundedWidth ?? 100])
	), [dims.boundedWidth]);

	const yScale = useMemo(() => (
		d3.scaleLinear()
			.domain([0, 100])
			.range([dims.boundedHeight ?? 100, 0])
	), [dims.boundedHeight]);

	const shapes = data.map((d, i) => {
		const xPos = xScale(d.x);
		const yPos = yScale(d.y);
		console.log(`Circle ${i}: xPos=${xPos}, yPos=${yPos}`);
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
						text: `Win probability: ${d.x}`,
					})
				}
				onMouseLeave={() =>
					setHovered(null)
				}
			/>
		);
	});

	const lineBuilder = d3.line<{ x: number, y: number; }>()
		.x((d) => xScale(d.x))
		.y((d) => yScale(d.y));

	const linePath = lineBuilder(data);
	if (!linePath) {
		return null;
	}

	return (
		<div style={{ position: "relative" }}>
			<svg width={dims.width} height={dims.height}>
				<g
					width={dims.boundedWidth}
					height={dims.boundedHeight}
					transform={`translate(${[dims.marginLeft, dims.marginTop].join(",")})`}
				>
					<path
						d={linePath}
						opacity={1}
						stroke="#1e90ff"
						fill="none"
						strokeWidth={4}
					/>
					<AxisLeft yScale={yScale} pixelsPerTick={40} width={dims.boundedWidth ?? 0} />
					<g transform={`translate(0, ${dims.boundedHeight})`}>
						<AxisBottom
							xScale={xScale}
							pixelsPerTick={40}
							height={dims.boundedHeight ?? 0}
						/>
					</g>
					{shapes}
				</g>
			</svg>
			<div
				style={{
					width: dims.boundedWidth,
					height: dims.boundedHeight,
					position: "absolute",
					top: 0,
					left: 0,
					pointerEvents: "none",
					marginLeft: dims.marginLeft,
					marginTop: dims.marginTop,
				}}
			>
				<Tooltip interactionInfo={hovered} />
			</div>
		</div>
	);
};