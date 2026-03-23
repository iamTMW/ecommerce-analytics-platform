import React, { useEffect, useState } from "react";
import TopProductsBarChart from "../components/TopProductsBarChart";
import { ProductRevenue } from "../types/ProductRevenue";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<ProductRevenue[]>([]);

  useEffect(() => {
    fetch("/api/customers/top")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4"></h2>
      <TopProductsBarChart 
      products={customers} 
      title="Top Customers by Revenue"  />
    </div>
  );
}