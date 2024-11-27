import React from 'react';
import { Review } from '../types';
import { ExternalLink } from 'lucide-react';

export function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="space-y-6 overflow-y-auto max-h-[600px] pr-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{review.productName}</h3>
            <a
              href={review.productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <h4 className="text-md font-medium">{review.title}</h4>
          <p className="text-gray-600">{review.body}</p>
          {review.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {review.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Review ${index + 1}`}
                  className="rounded-lg object-cover w-full h-32"
                />
              ))}
            </div>
          )}
          <div className="text-sm text-gray-500">
            {new Date(review.date).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}