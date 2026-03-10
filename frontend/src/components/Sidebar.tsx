import React from 'react';

type PageKey = 'home' | 'products' | 'revenue' | 'customers';

interface SidebarProps {
  activePage: PageKey;
  onPageChange: (page: PageKey) => void;
}

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const pages: { key: PageKey; label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'products', label: 'Products' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'customers', label: 'Customers' },
  ];

  return (
    <div className="w-fit h-full">
      <h1 className="text-xl text-purple-500 font-semibold">
        E-Commerce Analysis
      </h1>
      <nav className="mt-4 space-y-2">
        {pages.map((page) => (
          <button
            key={page.key}
            onClick={() => onPageChange(page.key)}
            className={`block w-full text-left px-4 py-2 text-sm rounded ${
              activePage === page.key
                ? 'bg-slate-300 font-semibold text-black'
                : 'text-gray-700 hover:bg-slate-100'
            }`}
          >
            {page.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
