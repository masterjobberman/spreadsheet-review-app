import React from 'react';
import { Layout as LayoutIcon, Star } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LayoutIcon className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold">SpreadReview</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-sm text-gray-600">Review Manager</span>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}