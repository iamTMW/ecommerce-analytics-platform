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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type MonthlyRevenue = {
  month: string;
  revenue: number;
};

export default function RevenueChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [revenues, setRevenues] = useState<number[]>([]);

  useEffect(() => {
    fetch('/api/revenue/monthly')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch monthly revenue');
        }
        return res.json();
      })
      .then((data: MonthlyRevenue[]) => {
        setLabels(data.map((item) => item.month));
        setRevenues(data.map((item) => item.revenue));
      })
      .catch((error) => {
        console.error('Error fetching revenue data:', error);
      });
  }, []);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly Revenue ($)',
        data: revenues,
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
