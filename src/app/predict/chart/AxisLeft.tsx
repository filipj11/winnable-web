import { ScaleLinear } from "d3";
import { useMemo } from "react";

type AxisLeftProps = {
	yScale: ScaleLinear<number, number>;
	pixelsPerTick: number;
	width: number;
};

const TICK_LENGTH = 10;

export const AxisLeft = ({ yScale, pixelsPerTick, width }: AxisLeftProps) => {
	const range = yScale.range();

	const ticks = useMemo(() => {
		const height = range[0] - range[1];
		const numTicksTarget = Math.floor(height / pixelsPerTick);

		return yScale.ticks(numTicksTarget).map((value) => ({
			value,
			yOffset: yScale(value),
		}));
	}, [yScale]);

	return (
		<>
			{ticks.map(({ value, yOffset }) => (
				<g
					key={value}
					transform={`translate(0, ${yOffset})`}
					shapeRendering={"crispEdges"}
				>
					<line
						x1={-TICK_LENGTH}
						x2={width + TICK_LENGTH}
						stroke="#D2D7D3"
						strokeWidth={0.5}
					/>
					<text
						key={value}
						style={{
							fontSize: "10px",
							textAnchor: "middle",
							transform: "translateX(-20px)",
							fill: "#D2D7D3",
						}}
					>
						{value}
					</text>
				</g>
			))}
		</>
	);
};
