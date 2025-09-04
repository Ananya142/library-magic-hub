import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCard } from "@/components/BookCard";
import { SearchBar } from "@/components/SearchBar";
import { BookForm } from "@/components/BookForm";
import { IssueBookDialog } from "@/components/IssueBookDialog";
import { useBooks } from "@/hooks/useBooks";
import { Book } from "@/types/Book";
import { Plus, BookOpen, Users, AlertCircle, Library } from "lucide-react";

export default function LibraryDashboard() {
  const { books, addBook, updateBook, deleteBook, issueBook, returnBook, searchBooks } = useBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [issuingBookId, setIssuingBookId] = useState<string>("");

  const filteredBooks = searchBooks(searchQuery);
  
  const stats = {
    total: books.length,
    available: books.filter(book => book.status === 'available').length,
    issued: books.filter(book => book.status === 'issued').length,
    overdue: books.filter(book => book.status === 'overdue').length,
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setIsBookFormOpen(true);
  };

  const handleAddNewBook = () => {
    setEditingBook(null);
    setIsBookFormOpen(true);
  };

  const handleBookFormSubmit = (bookData: any) => {
    if (editingBook) {
      updateBook(editingBook.id, bookData);
    } else {
      addBook(bookData);
    }
  };

  const handleIssueBook = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setIssuingBookId(bookId);
      setIsIssueDialogOpen(true);
    }
  };

  const handleIssueSubmit = (memberName: string) => {
    if (issuingBookId) {
      issueBook(issuingBookId, memberName);
      setIssuingBookId("");
    }
  };

  const issuingBook = books.find(b => b.id === issuingBookId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-library-primary to-library-secondary">
                <Library className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Library Management</h1>
                <p className="text-sm text-muted-foreground">Manage your digital library collection</p>
              </div>
            </div>
            <Button 
              onClick={handleAddNewBook}
              className="bg-library-primary hover:bg-library-primary/90 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border/50 bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Books</CardTitle>
              <BookOpen className="h-4 w-4 text-library-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
              <div className="h-4 w-4 rounded-full bg-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.available}</div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Issued</CardTitle>
              <Users className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.issued}</div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.overdue}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <Card className="border-border/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery ? "No books found" : "No books in library"}
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchQuery 
                  ? "Try adjusting your search terms or clear the search to see all books."
                  : "Get started by adding your first book to the library collection."
                }
              </p>
              {!searchQuery && (
                <Button onClick={handleAddNewBook} className="bg-library-primary hover:bg-library-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Book
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEditBook}
                onDelete={deleteBook}
                onIssue={handleIssueBook}
                onReturn={returnBook}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dialogs */}
      <BookForm
        isOpen={isBookFormOpen}
        onClose={() => {
          setIsBookFormOpen(false);
          setEditingBook(null);
        }}
        onSubmit={handleBookFormSubmit}
        book={editingBook}
      />

      <IssueBookDialog
        isOpen={isIssueDialogOpen}
        onClose={() => {
          setIsIssueDialogOpen(false);
          setIssuingBookId("");
        }}
        onIssue={handleIssueSubmit}
        bookTitle={issuingBook?.title || ""}
      />
    </div>
  );
}