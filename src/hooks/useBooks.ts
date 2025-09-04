import { useLocalStorage } from './useLocalStorage';
import { Book, BookFormData } from '../types/Book';
import { toast } from './use-toast';

export function useBooks() {
  const [books, setBooks] = useLocalStorage<Book[]>('library-books', []);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const addBook = (bookData: BookFormData) => {
    const newBook: Book = {
      ...bookData,
      id: generateId(),
      status: 'available',
      createdAt: new Date().toISOString(),
    };

    setBooks(prev => [...prev, newBook]);
    toast({
      title: "Book Added",
      description: `"${bookData.title}" has been added to the library.`,
    });
    return newBook;
  };

  const updateBook = (id: string, bookData: Partial<BookFormData>) => {
    setBooks(prev => 
      prev.map(book => 
        book.id === id 
          ? { ...book, ...bookData }
          : book
      )
    );
    toast({
      title: "Book Updated",
      description: "Book details have been updated successfully.",
    });
  };

  const deleteBook = (id: string) => {
    const book = books.find(b => b.id === id);
    setBooks(prev => prev.filter(book => book.id !== id));
    toast({
      title: "Book Deleted",
      description: `"${book?.title}" has been removed from the library.`,
      variant: "destructive",
    });
  };

  const issueBook = (id: string, issuedTo: string) => {
    const issueDate = new Date();
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 14); // 14 days loan period

    setBooks(prev =>
      prev.map(book =>
        book.id === id
          ? {
              ...book,
              status: 'issued' as const,
              issuedTo,
              issuedDate: issueDate.toISOString(),
              dueDate: dueDate.toISOString(),
            }
          : book
      )
    );

    const book = books.find(b => b.id === id);
    toast({
      title: "Book Issued",
      description: `"${book?.title}" has been issued to ${issuedTo}.`,
    });
  };

  const returnBook = (id: string) => {
    const book = books.find(b => b.id === id);
    setBooks(prev =>
      prev.map(b =>
        b.id === id
          ? {
              ...b,
              status: 'available' as const,
              issuedTo: undefined,
              issuedDate: undefined,
              dueDate: undefined,
            }
          : b
      )
    );

    toast({
      title: "Book Returned",
      description: `"${book?.title}" has been returned successfully.`,
    });
  };

  const searchBooks = (query: string) => {
    if (!query.trim()) return books;
    
    return books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    books,
    addBook,
    updateBook,
    deleteBook,
    issueBook,
    returnBook,
    searchBooks,
  };
}