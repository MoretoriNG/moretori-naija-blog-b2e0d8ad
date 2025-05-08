
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

export function FeaturedPostsFooter() {
  return (
    <div className="flex justify-center mt-8">
      <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
        <Link to="/blog" className="flex items-center">
          Browse All Articles
          <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
