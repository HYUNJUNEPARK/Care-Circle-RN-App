import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * 인증 상태 관리 훅
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading };
};