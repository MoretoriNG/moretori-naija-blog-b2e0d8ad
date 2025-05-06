
// Utility functions for blog posts

// Helper function to generate a unique ID
export const generateId = (() => {
  let id = 30; // Start from a high number to avoid conflicts with existing posts
  return () => String(++id); // Convert to string to match Post interface
})();

// Format date for display
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};
