import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TechPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/category/tech', { replace: true });
  }, [navigate]);

  return null;
}