import React, { createContext, useEffect, useMemo, useState, useCallback } from "react";
import { onAuthStateChanged, type User, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseAuth";
import { getLoginUserInfo, signOut } from '../network/apis/userApis';
import type { UserInfo } from '../types/local/UserInfo';

/**
 * 인증 관련 상태를 제공하는 Context의 값 타입
 */
type AuthContextValue = {
    userInfo: UserInfo | null; // 서버에서 가져온 로그인 사용자 정보 (로그아웃 시 null)
    isLoading: boolean;     // 로그인 처리 중 여부
    isLoggedIn: boolean;    // 로그인 여부
    error: string | null;   // 인증 관련 에러 메시지
    loginWithEmail: (email: string, password: string) => Promise<boolean>; // 로그인 함수
    logout: () => void; // 로그아웃 함수
};

/**
 * 인증 상태를 전역으로 관리하기 위한 Context
 */
export const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Firebase 인증 상태를 React Context로 관리하는 Provider 컴포넌트
 * 
 * 주요 기능:
 * - Firebase Auth 상태 변화 실시간 감지
 * - 애플리케이션 전역에서 사용자 인증 정보 제공
 * - 로그인/로그아웃 상태 자동 동기화
 * 
 * @param children 하위 컴포넌트들
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Firebase 인증 상태 변화를 감지하고 React 상태와 동기화
    useEffect(() => {
        // Firebase Auth 상태 변화 리스너 등록
        // 사용자 로그인/로그아웃 시 자동으로 user 상태 업데이트
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log('AuthProvider - onAuthStateChanged', user);
            setUser(user); // Firebase에서 받은 사용자 정보로 상태 업데이트
        });
        // 컴포넌트 언마운트 시 리스너 정리 (메모리 누수 방지)
        return () => unsub();
    }, [user, userInfo]);

    /**
     * 로그인 처리:
     * - Firebase 인증 처리 (signInWithEmailAndPassword)
     * - 로그인 성공 시 서버에서 사용자 정보 동기화 (getLoginUserInfo)
     * - 로그인 실패 시 에러 상태 업데이트
     */
    const loginWithEmail = useCallback(async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            // 1. Firebase 인증
            await signInWithEmailAndPassword(auth, email, password);
            // 2. 서버 사용자 정보 동기화
            const userInfo = await getLoginUserInfo();
            setUserInfo(userInfo);
            setIsLoading(false);
            return true;
        } catch (err: any) {
            console.error('login error:', err);
            setUserInfo(null);
            setError(err?.message || '로그인에 실패했습니다.');
            setIsLoading(false);
            return false;
        }
    }, []);

    /**
     * 로그아웃 처리:
     * - Firebase에서 로그아웃 처리
     * - React 상태 초기화 (userInfo, error)
     */
    const logout = useCallback(async () => {
        // console.log('AuthProvider - logout called, current user:', auth.currentUser);

        const currentUser = auth.currentUser;
        console.log('AuthProvider - logout, current user:', currentUser);

        if (!user) {
            console.warn('No user to log out');
            return;
        }

        try {
            // 1. 서버 로그아웃 처리: Firebase 로그아웃 처리를 뒤에 해야 헤더에 토큰이 들어감
            await signOut();

            // 2. Firebase 로그아웃 처리
            await auth.signOut();
        } catch (err) {
            console.error('logout error:', err);
        } finally {
            setUserInfo(null);
        }
    }, []);

    // user 상태가 변경될 때마다 새로운 context 값 생성 (성능 최적화)
    const value = useMemo<AuthContextValue>(
        () => ({ userInfo, isLoading, isLoggedIn: !!userInfo, error, loginWithEmail, logout }),
        [userInfo, isLoading, error, loginWithEmail, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}