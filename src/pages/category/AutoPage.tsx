import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AutoPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/category/auto', { replace: true });
  }, [navigate]);

  return null;
}