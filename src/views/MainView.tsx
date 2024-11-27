import React, { useState } from 'react';
import { SpreadsheetTable } from '../components/SpreadsheetTable';
import { SpreadsheetForm } from '../components/SpreadsheetForm';
import { ReviewForm } from '../components/ReviewForm';
import { ReviewList } from '../components/ReviewList';
import { SpreadsheetFormData } from '../types';
import { useStore } from '../store';
import { extractImageFromUrl } from '../utils/imageUtils';

export function MainView() {
  const [activeTab, setActiveTab] = useState<'tables' | 'reviews'>('tables');
  const { reviews, spreadsheetData, setSpreadsheetData, deleteSpreadsheetEntry } = useStore();

  const handleSpreadsheetSubmit = async (formData: SpreadsheetFormData) => {
    const imageUrl = await extractImageFromUrl(formData.productLink);
    const newEntry = {
      id: spreadsheetData.length + 1,
      ...formData,
      imageUrl,
      check: calculateCheck(formData.commission, formData.purchaseAmount, formData.refundAmount),
      reviewSent: false,
      reviewPosted: false,
      paymentReceived: false,
    };
    setSpreadsheetData([...spreadsheetData, newEntry]);
  };

  const calculateCheck = (commission: number, purchaseAmount: number, refundAmount: number): string => {
    if (refundAmount === 0) return '';
    const total = commission + purchaseAmount;
    if (total === refundAmount) return 'Correct';
    return total < refundAmount ? 'HIGH' : 'LOW';
  };

  const toggleStatus = (id: number, field: 'reviewSent' | 'reviewPosted' | 'paymentReceived') => {
    setSpreadsheetData(
      spreadsheetData.map((entry) =>
        entry.id === id ? { ...entry, [field]: !entry[field] } : entry
      )
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <nav className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('tables')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'tables'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tables
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'reviews'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Reviews
        </button>
      </nav>

      {activeTab === 'tables' ? (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Spreadsheet Data</h2>
            <SpreadsheetTable
              data={spreadsheetData}
              onToggleStatus={toggleStatus}
              onDelete={deleteSpreadsheetEntry}
            />
          </div>
          <SpreadsheetForm onSubmit={handleSpreadsheetSubmit} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Add Review</h2>
            <ReviewForm />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <ReviewList reviews={reviews} />
          </div>
        </div>
      )}
    </div>
  );
}