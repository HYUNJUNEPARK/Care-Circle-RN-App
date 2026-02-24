import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from './firebaseAuth';
import { onAuthStateChanged } from 'firebase/auth';
import type { UserInfo } from '../types/local/UserInfo';
import { getLoginUserInfo } from '../network/apis/userApis';

/**
 * 인증 상태 관리 훅
 * 컴포넌트에서 현재 로그인된 사용자 상태에 쉽게 접근할 수 있도록 제공
 */
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Firebase 인증 상태 변경 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user);

      if (user) {
        try {
          setLoading(true);
          // 서버와 사용자 정보 가져오기
          const userInfo = await getLoginUserInfo();
          console.log('Fetched user info:', userInfo);

          setUserInfo(userInfo);
          setUser(user);
        } catch (e) {
          console.error('Failed to fetch user info:', e);
          setUserInfo(null);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setUserInfo(null);
        setLoading(false);
        setUser(null);
      }
    });
    // 컴포넌트 언마운트 시 구독 해제
    return unsubscribe;
  }, []);

  return { user, userInfo, loading };
};

export default useAuth;