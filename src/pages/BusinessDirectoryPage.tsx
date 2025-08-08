import { useEffect } from 'react';
import { BusinessDirectory } from '@/components/business/BusinessDirectory';

export default function BusinessDirectoryPage() {
  useEffect(() => {
    const title = 'Business Directory | MoreTori';
    const description = 'Discover and connect with trusted businesses across technology, health, auto, and more on the MoreTori Business Directory.';
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + '/business-directory');
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container px-4 lg:px-8 py-8">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Business Directory</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Explore featured businesses, filter by category, and discover services tailored to your needs.</p>
        </header>
        <BusinessDirectory />
      </div>
    </main>
  );
}
