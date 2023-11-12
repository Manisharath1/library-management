export default interface Book {
  bookId?: string;
  bookName: string;
  author: string;
  description: string;
  referenceNumber: string;
  shelfNumber: string;
  batchId: string;
  semester?: number;
  availableStock?: number;
  image?: string;
  status?: string;
  createdDate?: string;
  createdBy?: string;
  updatedDate?: string;
  updatedBy?: string;
}
