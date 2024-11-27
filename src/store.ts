import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Review, SpreadsheetEntry } from './types';

interface Store {
  reviews: Review[];
  spreadsheetData: SpreadsheetEntry[];
  addReview: (review: Review) => void;
  setSpreadsheetData: (data: SpreadsheetEntry[]) => void;
  deleteSpreadsheetEntry: (id: number) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      reviews: [],
      spreadsheetData: [],
      addReview: (review) =>
        set((state) => ({ reviews: [review, ...state.reviews] })),
      setSpreadsheetData: (data) => set({ spreadsheetData: data }),
      deleteSpreadsheetEntry: (id) =>
        set((state) => ({
          spreadsheetData: state.spreadsheetData.filter((entry) => entry.id !== id),
        })),
    }),
    {
      name: 'spreadsheet-storage',
    }
  )
);