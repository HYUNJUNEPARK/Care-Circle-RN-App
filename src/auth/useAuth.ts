import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * 인증 상태 관리 훅
 * 컴포넌트에서 현재 로그인된 사용자 상태에 쉽게 접근할 수 있도록 제공
 */
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  // Firebase 인증 상태 변경 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return unsubscribe; 
  }, []);

  return { user };
};

export default useAuth;