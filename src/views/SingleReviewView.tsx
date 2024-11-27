import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReviewForm } from '../components/ReviewForm';
import { useStore } from '../store';

export function SingleReviewView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const spreadsheetData = useStore((state) => state.spreadsheetData);
  
  const entry = spreadsheetData.find((item) => item.id === Number(id));
  
  if (!entry) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Product not found
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          ← Back to List
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={entry.imageUrl}
            alt={entry.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div>
            <h1 className="text-2xl font-bold">{entry.name}</h1>
            <a
              href={entry.productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              View Product
            </a>
          </div>
        </div>
        
        <ReviewForm
          initialData={{
            productName: entry.name,
            productLink: entry.productLink,
          }}
        />
      </div>
    </div>
  );
}