import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewsPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/category/news', { replace: true });
  }, [navigate]);

  return null;
}