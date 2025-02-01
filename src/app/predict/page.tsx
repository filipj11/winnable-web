'use client';

/*
import { LineChart } from "./chart/LineChart";

export default function Predict() {
  return (
	<div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex flex-col items-center justify-center p-6">
	  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl text-center flex flex-col items-center">
		<h1 className="text-4xl font-semibold text-gray-800 mb-4">Data Prediction</h1>
		<p className="text-gray-600 mb-6">Visualizing predictive data with a sleek, modern design.</p>
		<div className="w-full lg:w-3/4 xl:w-2/3 h-96">
		  <LineChart 
			data={[{ x: 50, y: 50 }, { x: 1000, y: 60 }, { x: 4000, y: 40 }]} 
			width={0}  // width set to 0 for responsive behavior 
			height={0} // height set to 0 for responsive behavior 
		  />
		</div>
	  </div>
	</div>
  );
}
*/

import { LineChart } from "./chart/LineChart";
import useChartDimensions from "./chart/useChartDimensions";

export default function Page() {
	// Hardcoded data for the chart
	const chartData = [
		{ x: 50, y: 50 },
		{ x: 1000, y: 60 },
		{ x: 4000, y: 40 },
	];

	const [ref, dims] = useChartDimensions({
		width: 0,
		height: 0,
		marginTop: 10,
		marginRight: 0,
		marginBottom: 0,
		marginLeft: 10
	});


	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
			<div className="w-full max-w-7xl p-6 bg-white rounded-xl shadow-xl">
				{/* Main Chart Container */}
				<div ref={ref} className="relative w-full h-[80vh] sm:h-[85vh] rounded-xl overflow-hidden bg-white shadow-lg">
					<LineChart data={chartData} dims={dims} />
				</div>

				{/* Footer Information */}
				<div className="absolute bottom-6 left-6 text-white text-lg font-semibold flex justify-between w-full">
					<span>Real-time Updates</span>
					<span>Game Time: 4m 00s</span>
				</div>

				{/* Header with Title */}
				<div className="absolute top-6 left-6 text-white text-3xl font-extrabold tracking-wide">
					<h1>League of Legends Match Win Probability</h1>
				</div>
			</div>
		</div>
	);
};