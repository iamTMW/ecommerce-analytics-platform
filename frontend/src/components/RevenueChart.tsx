import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MonthlyRevenue } from '../types/MonthlyRevenue';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type RevenueChartProps = {
  rows: MonthlyRevenue[];
};

export default function RevenueChart({ rows }: RevenueChartProps) {
  const labels = rows.map((r) => r.month);
  const values = rows.map((r) => r.revenue);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly Revenue',
        data: values,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="relative w-full h-80">
      <Line data={data} options={options} />
    </div>
  );
}
