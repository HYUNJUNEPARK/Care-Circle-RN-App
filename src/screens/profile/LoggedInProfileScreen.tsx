import React from 'react';
import { View, Text } from 'react-native';
import useAuth from '../../auth/useAuth';


/**
 * 로그인 사용자 프로필 화면 컴포넌트
 * 로그인한 사용자가 프로필 화면에 접근했을 때 보여지는 화면
 */
const LoggedInProfileScreen = () => {
  const { userInfo } = useAuth();

  return (
    <View>
      <Text>로그인 사용자 프로필 화면</Text>
      <Text>uid: {userInfo?.uid}</Text>
      <Text>이메일: {userInfo?.email}</Text>
    </View>
  );
};

export default LoggedInProfileScreen;
