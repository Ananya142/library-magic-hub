export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publishedYear: number;
  status: 'available' | 'issued' | 'overdue';
  issuedTo?: string;
  issuedDate?: string;
  dueDate?: string;
  createdAt: string;
}

export interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  category: string;
  publishedYear: number;
}