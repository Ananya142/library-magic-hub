import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserCheck } from "lucide-react";

interface IssueBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onIssue: (memberName: string) => void;
  bookTitle: string;
}

export function IssueBookDialog({ isOpen, onClose, onIssue, bookTitle }: IssueBookDialogProps) {
  const [memberName, setMemberName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) {
      setError("Member name is required");
      return;
    }
    onIssue(memberName.trim());
    setMemberName("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setMemberName("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px] bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <UserCheck className="h-5 w-5" />
            Issue Book
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Issuing: <span className="font-medium text-foreground">"{bookTitle}"</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memberName">Member Name</Label>
            <Input
              id="memberName"
              value={memberName}
              onChange={(e) => {
                setMemberName(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter member's full name"
              className={error ? "border-destructive" : ""}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-library-primary hover:bg-library-primary/90">
              Issue Book
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}