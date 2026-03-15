import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TestHomepage from './TestHomepage';
import ProductsPage from './ProductsPage';
import RevenuePage from './RevenuePage';

type PageKey = 'home' | 'products' | 'revenue' | 'customers';

export default function Dashboard() {
  const [activePage, setActivePage] = useState<PageKey>('home');

  const pageInfo: Record<PageKey, { title: string; description: string }> = {
    home: {
      title: 'Home',
      description: 'Welcome to your ecommerce analytics dashboard',
    },
    products: {
      title: 'Products',
      description: 'View and manage your product inventory and performance',
    },
    revenue: {
      title: 'Revenue',
      description: 'Track your sales and revenue trends over time',
    },
    customers: {
      title: 'Customers',
      description: 'Analyze customer data and purchasing patterns',
    },
  };

  // add real pages or more here for each page key
  const pageComponents: Partial<Record<PageKey, React.FC>> = {
    home: TestHomepage,
    products: ProductsPage,
    revenue: RevenuePage,
  };

  const currentPage = pageInfo[activePage];
  const CurrentPageComponent = pageComponents[activePage];

  return (
    <div className="bg-slate-200 h-svh p-5 text-white flex gap-2">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="w-full bg-slate-100 h-full rounded-lg shadow-md border border-gray-300 flex flex-col">
        <div className="p-2 border-b border-gray-300 px-3 flex items-center gap-4">
          <p className="font-semibold text-gray-800">{currentPage.title}</p>
          <p className="text-gray-400">·</p>
          <p className="text-gray-400">{currentPage.description}</p>
        </div>
        <div className="flex-1 overflow-auto">
          {CurrentPageComponent ? (
            <CurrentPageComponent />
          ) : (
            <div className="p-6">
              <p className="text-gray-600">Page coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
