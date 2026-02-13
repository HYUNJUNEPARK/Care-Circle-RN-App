import React from 'react';
import { View, Text, Button, StyleSheet, BackHandler, Platform, ScrollView } from 'react-native';
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

  // TODO: 실제 사용자 정보는 props/context 등에서 받아와야 함. 임시 하드코딩
  const user = {
    name: '홍길동',
    email: 'honggildong@email.com',
  };

  return (

    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* 사용자 정보 카드 */}
      <View style={styles.profileCard}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{user.name[0]}</Text>
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      {/* 설정 메뉴 */}
      <View style={styles.menuSection}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>앱 설정</Text>
          <Button
            title="이동"
            color="#AABC99"
            onPress={() => {
              // TODO: 실제 설정 화면으로 이동 구현 필요
              // navigation.navigate('Settings');
            }}
          />
        </View>
        {/* 추가 메뉴 예시 */}
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>알림 설정</Text>
          <Button title="이동" color="#AABC99" onPress={() => { }} />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>알림 설정</Text>
          <Button title="이동" color="#AABC99" onPress={() => { }} />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>알림 설정</Text>
          <Button title="이동" color="#AABC99" onPress={() => { }} />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>알림 설정</Text>
          <Button title="이동" color="#AABC99" onPress={() => { }} />
        </View>
      </View>

      <View style={styles.menuSection}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>앱 설정</Text>
          <Button
            title="이동"
            color="#AABC99"
            onPress={() => {
              // TODO: 실제 설정 화면으로 이동 구현 필요
              // navigation.navigate('Settings');
            }}
          />
        </View>
        {/* 추가 메뉴 예시 */}
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>알림 설정</Text>
          <Button title="이동" color="#AABC99" onPress={() => { }} />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>알림 설정</Text>
          <Button title="이동" color="#AABC99" onPress={() => { }} />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>알림 설정</Text>
          <Button title="이동" color="#AABC99" onPress={() => { }} />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>알림 설정</Text>
          <Button title="이동" color="#AABC99" onPress={() => { }} />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#AABC99',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    // marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#222',
  },
});

export default ProfileScreen;
