import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import { Book } from "@/types/Book";
import { BookOpen, Calendar, User, Edit, Trash2, UserCheck, RotateCcw } from "lucide-react";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onIssue: (id: string) => void;
  onReturn: (id: string) => void;
}

export function BookCard({ book, onEdit, onDelete, onIssue, onReturn }: BookCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 bg-gradient-to-br from-card to-muted/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground leading-tight">
            {book.title}
          </CardTitle>
          <StatusBadge status={book.status} />
        </div>
        <p className="text-muted-foreground font-medium">{book.author}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>ISBN: {book.isbn}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{book.publishedYear}</span>
          </div>
        </div>

        <Badge variant="outline" className="text-xs">
          {book.category}
        </Badge>

        {book.status === 'issued' && book.issuedTo && (
          <div className="pt-2 space-y-1 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Issued to: {book.issuedTo}</span>
            </div>
            {book.dueDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Due: {formatDate(book.dueDate)}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(book)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          
          {book.status === 'available' ? (
            <Button
              variant="default"
              size="sm"
              onClick={() => onIssue(book.id)}
              className="flex-1 bg-library-primary hover:bg-library-primary/90"
            >
              <UserCheck className="h-4 w-4 mr-1" />
              Issue
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => onReturn(book.id)}
              className="flex-1 bg-success hover:bg-success/90"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Return
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(book.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}