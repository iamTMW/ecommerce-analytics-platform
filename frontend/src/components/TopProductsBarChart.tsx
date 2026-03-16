import React from 'react';
import { ProductRevenue } from '../types/ProductRevenue';

type TopProductsBarChartProps = {
  products: ProductRevenue[];
  title?: string;
};

const BAR_COLORS = [
  '#ff4d3a',
  '#ff3b30',
  '#d7263d',
  '#243b6b',
  '#ff6b57',
  '#ef4444',
  '#dc2626',
  '#1d4ed8',
  '#2563eb',
  '#0f766e',
];

export default function TopProductsBarChart({
  products,
  title = 'Top 10 Products by Revenue',
}: TopProductsBarChartProps) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white p-6 rounded border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-500">No matching products found.</p>
      </div>
    );
  }

  const topProducts = [...products]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  const maxRevenue = Math.max(...topProducts.map((product) => product.revenue), 1);

  return (
    <div className="bg-white p-6 rounded border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>

      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="relative h-80 border-l border-b border-gray-300 px-4 pt-4">

            <div className="absolute inset-0 flex flex-col justify-between px-4 py-4 pointer-events-none">
              <div className="border-t border-gray-200" />
              <div className="border-t border-gray-200" />
              <div className="border-t border-gray-200" />
              <div className="border-t border-gray-200" />
              <div className="border-t border-gray-200" />
            </div>

            <div className="relative z-10 flex h-full items-end justify-around gap-4">
              {topProducts.map((product, index) => {
                const barHeight = Math.max((product.revenue / maxRevenue) * 220, 12);
                const barColor = BAR_COLORS[index % BAR_COLORS.length];

                return (
                  <div
                    key={`${product.stockCode}-${product.description}`}
                    className="flex w-20 flex-col items-center justify-end cursor-pointer"
                    title={`${product.description} (${product.stockCode}): £${product.revenue.toFixed(2)}`}
                  >
                    <p className="mb-2 text-xs font-medium text-gray-700">
                      £{product.revenue.toFixed(0)}
                    </p>

                    <div
                      className="w-10 rounded-t-sm"
                      style={{
                        height: `${barHeight}px`,
                        backgroundColor: barColor,
                      }}
                      aria-label={`${product.description} revenue bar`}
                    />

                    <p className="mt-3 text-xs font-semibold text-gray-700 text-center">
                      {product.stockCode}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          <div className="mt-6 overflow-hidden rounded border border-gray-200 bg-white">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                    Stock Code
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                    Product
                  </th>
                </tr>
              </thead>

              <tbody>
                {topProducts.map((product) => (
                  <tr
                    key={`label-${product.stockCode}-${product.description}`}
                    className="border-b border-gray-200"
                  >
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {product.stockCode}
                    </td>

                    <td className="px-4 py-3 text-gray-700">
                      {product.description}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
}