import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EntertainmentPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/category/entertainment', { replace: true });
  }, [navigate]);

  return null;
}