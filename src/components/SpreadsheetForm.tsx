import React, { useState } from 'react';
import { SpreadsheetFormData } from '../types';

interface SpreadsheetFormProps {
  onSubmit: (data: SpreadsheetFormData) => void;
}

export function SpreadsheetForm({ onSubmit }: SpreadsheetFormProps) {
  const [formData, setFormData] = useState<SpreadsheetFormData>({
    name: '',
    commission: 0,
    purchaseAmount: 0,
    refundAmount: 0,
    productLink: '',
    reviewLink: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      commission: 0,
      purchaseAmount: 0,
      refundAmount: 0,
      productLink: '',
      reviewLink: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Commission ($)</label>
          <input
            type="number"
            required
            step="0.01"
            value={formData.commission}
            onChange={(e) => setFormData((prev) => ({ ...prev, commission: parseFloat(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Purchase Amount ($)</label>
          <input
            type="number"
            required
            step="0.01"
            value={formData.purchaseAmount}
            onChange={(e) => setFormData((prev) => ({ ...prev, purchaseAmount: parseFloat(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Refund Amount ($)</label>
          <input
            type="number"
            required
            step="0.01"
            value={formData.refundAmount}
            onChange={(e) => setFormData((prev) => ({ ...prev, refundAmount: parseFloat(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Link</label>
          <input
            type="url"
            required
            value={formData.productLink}
            onChange={(e) => setFormData((prev) => ({ ...prev, productLink: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Review Link</label>
          <input
            type="url"
            required
            value={formData.reviewLink}
            onChange={(e) => setFormData((prev) => ({ ...prev, reviewLink: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Entry
        </button>
      </div>
    </form>
  );
}