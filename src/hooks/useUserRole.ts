import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type AppRole = 'admin' | 'moderator' | 'user' | null;

export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<AppRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        setRole(null);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('get_user_role', { 
          _user_id: user.id 
        });

        if (error) {
          console.error('Error fetching user role:', error);
          setRole(null);
        } else {
          setRole(data as AppRole);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  return {
    role,
    isLoading,
    isAdmin: role === 'admin',
    isModerator: role === 'moderator',
    isUser: role === 'user',
  };
}
