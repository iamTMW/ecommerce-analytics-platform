import React, { useEffect, useState } from 'react';
import TopProductsBarChart from '../components/TopProductsBarChart';
import { ProductRevenue } from '../types/ProductRevenue';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductRevenue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTopProducts() {
      try {
        const response = await fetch('/api/products/top10');

        if (!response.ok) {
          throw new Error('Failed to load top products');
        }

        const data = await response.json();

        const normalizedProducts: ProductRevenue[] = data.map((product: ProductRevenue) => ({
          stockCode: product.stockCode,
          description: product.description,
          revenue: Number(product.revenue),
        }));

        setProducts(normalizedProducts);
      } catch (err) {
        setError('Unable to load top products right now.');
      } finally {
        setLoading(false);
      }
    }

    fetchTopProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Loading top products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search product by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md rounded border border-gray-300 bg-white p-2 text-black placeholder-gray-500"
        />
      </div>

      <TopProductsBarChart products={filteredProducts} />
    </div>
  );
}