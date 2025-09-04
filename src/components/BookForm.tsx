import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookFormData, Book } from "@/types/Book";
import { Plus, Save } from "lucide-react";

interface BookFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookFormData) => void;
  book?: Book | null;
}

interface FormErrors {
  title?: string;
  author?: string;
  isbn?: string;
  category?: string;
  publishedYear?: string;
}

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "History",
  "Biography",
  "Self-Help",
  "Business",
  "Art",
  "Literature",
  "Philosophy",
  "Education"
];

export function BookForm({ isOpen, onClose, onSubmit, book }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publishedYear: new Date().getFullYear(),
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        category: book.category,
        publishedYear: book.publishedYear,
      });
    } else {
      setFormData({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publishedYear: new Date().getFullYear(),
      });
    }
    setErrors({});
  }, [book, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }
    if (!formData.isbn.trim()) {
      newErrors.isbn = "ISBN is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (formData.publishedYear < 1000 || formData.publishedYear > new Date().getFullYear() + 1) {
      newErrors.publishedYear = "Invalid year";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleInputChange = (field: keyof BookFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            {book ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {book ? "Edit Book" : "Add New Book"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                className={errors.author ? "border-destructive" : ""}
              />
              {errors.author && <p className="text-sm text-destructive">{errors.author}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange("isbn", e.target.value)}
                  className={errors.isbn ? "border-destructive" : ""}
                />
                {errors.isbn && <p className="text-sm text-destructive">{errors.isbn}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Published Year</Label>
                <Input
                  id="year"
                  type="number"
                  min="1000"
                  max={new Date().getFullYear() + 1}
                  value={formData.publishedYear}
                  onChange={(e) => handleInputChange("publishedYear", parseInt(e.target.value) || new Date().getFullYear())}
                  className={errors.publishedYear ? "border-destructive" : ""}
                />
                {errors.publishedYear && <p className="text-sm text-destructive">{errors.publishedYear}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-library-primary hover:bg-library-primary/90">
              {book ? "Update Book" : "Add Book"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}