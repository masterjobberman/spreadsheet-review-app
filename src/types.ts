export interface Column {
  header: string;
  accessorKey: string;
}

export interface TableData {
  columns: Column[];
  data: any[];
}

export interface Review {
  id: string;
  productName: string;
  productLink: string;
  title: string;
  body: string;
  images: string[];
  date: string;
}

export interface SpreadsheetEntry {
  id: number;
  name: string;
  commission: number;
  purchaseAmount: number;
  refundAmount: number;
  check: string;
  reviewSent: boolean;
  reviewPosted: boolean;
  paymentReceived: boolean;
  productLink: string;
  reviewLink: string;
  imageUrl: string;
}

export interface SpreadsheetFormData {
  name: string;
  commission: number;
  purchaseAmount: number;
  refundAmount: number;
  productLink: string;
  reviewLink: string;
}