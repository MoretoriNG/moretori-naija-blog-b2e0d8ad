import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HealthPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/category/health', { replace: true });
  }, [navigate]);

  return null;
}