import React from 'react';
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
import { RevenueSeriesRow } from '../types/RevenueSeriesRow';

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
  rows: RevenueSeriesRow[];
  datasetLabel: string;
};

export default function RevenueChart({ rows, datasetLabel }: RevenueChartProps) {
  const labels = rows.map((r) => r.period);
  const values = rows.map((r) => r.revenue);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const data = {
    labels,
    datasets: [
      {
        label: datasetLabel,
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
