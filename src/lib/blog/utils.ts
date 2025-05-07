
// Utility functions for blog

// Function to generate a unique ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Function to format dates consistently
export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};
