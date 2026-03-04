import React from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import useAuth from '../../auth/useAuth';

interface ProfileScreenProps {
  navigation: any;
}

/**
 * 미로그인 사용자 프로필 화면 컴포넌트
 * 로그인하지 않은 사용자가 프로필 화면에 접근했을 때 보여지는 화면
 */
const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { logOut: logout } = useAuth();

  return (
    <ScrollView>
      <View style={{ paddingVertical: 16, paddingHorizontal: 8 }}>

        <Button title="로그아웃" onPress={async () => {
          await logout();
          navigation.goBack();
        }} />
      </View>
    </ScrollView>

  );
};

export default ProfileScreen;