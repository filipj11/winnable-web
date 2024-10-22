"use client"

import React, { useState } from 'react';
import Chart from './chart';

const Page = () => {
  const [dataPoint, setDataPoint] = useState<{ time: number; probability: number }>({
    time: 30,
    probability: 0.7,
  });

  const [dataPoints, setDataPoints] = useState<{ time: number; probability: number }[]>([
    dataPoint,
  ]);

  const addDataPoint = () => {
    // Create a new dummy value
    const newTime = dataPoints.length * 10 + 30; // Increment time
    const newWinProb = Math.random(); // Random probability between 0 and 1

    // Update the state with the new data point
    setDataPoints((prev) => [...prev, { time: newTime, probability: newWinProb }]);
    setDataPoint({ time: newTime, probability: newWinProb }); // Update the displayed point
  };

  return (
    <div>
      <h1>Win Probability Chart</h1>
      <Chart winProb={dataPoint.probability} time={dataPoint.time} />
      <button onClick={addDataPoint}>Add Dummy Data Point</button>
      <ul>
        {dataPoints.map((point, index) => (
          <li key={index}>
            Time: {point.time}s, Probability: {point.probability.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;