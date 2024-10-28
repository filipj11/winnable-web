'use client'

import { LineChart } from "./chart/LineChart";

/*
const Page: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Win Probability Tracker</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <LineChart data={[{x: 50, y: 100}, {x: 55, y: 200}, {x: 54, y: 300}]} width={400} height={400}></LineChart>
        </div>
      </div>
    </div>
  );
}; */

 export default function Predict() {
  return(<LineChart data={[{x: 50, y: 100}, {x: 55, y: 200}, {x: 54, y: 300}]} width={400} height={400}></LineChart>)
 }
