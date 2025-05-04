
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function AdminHeader({ title, description, actions }: AdminHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
      <div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Site
            </Link>
          </Button>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mt-2">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
