import React from 'react';
import { View, Text, Button, StyleSheet, BackHandler, Platform } from 'react-native';
import useBackHandler from './useBackHandler';
import useTextModal from '../components/modal/useTextModal';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const state = navigation.getState();
  const routes = state.routes;
  const { showAlert } = useTextModal();

  useBackHandler({
    onBackPress: () => {
      // 네비게이션 스택에 뒤로 갈 화면이 없거나, 루트 스택이 바로 아래에 있을 때
      if (!navigation.canGoBack() || routes.length === 2) {
          showAlert({
            title: '앱을 종료하시겠습니까?',
            message: '앱을 종료하려면 확인을 눌러주세요.',
            onConfirmAction: () => {
              BackHandler.exitApp();
            }
          });
          return true;
        }
      navigation.goBack();
      return true;
    }
  });

  return (
    <View style={{
      backgroundColor: '#f3f3f3',
    }}>
    </View>
  );
};

export default ProfileScreen;
