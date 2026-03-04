import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/buttons/CustomButton';
import useAuth from '../../auth/useAuth';
import { appIcon } from '../../../assets';

interface ProfileScreenProps {
  navigation: any;
}

/**
 * 로그인 사용자 프로필 화면 컴포넌트
 * 로그인한 사용자가 프로필 화면에 접근했을 때 보여지는 화면
 */
const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { user, logOut } = useAuth();
  // ...existing code...
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 24, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          {/* 프로필 이미지 원형 아바타 */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <View style={{ padding: 8, backgroundColor: '#fff', borderRadius: 50, borderWidth: 1, borderColor: '#d7d7d7' }}>
              <Image
                source={user?.photoURL ? { uri: user.photoURL } : appIcon}
                style={{ width: 66, height: 66, borderRadius: 33, backgroundColor: '#fff' }}
                resizeMode="cover"
              />
            </View>
          </View>
          {/* 이메일 탭 */}
          <View style={{ width: '100%', overflow: 'hidden' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: '#888' }}>이메일</Text>
              <Text style={{ fontSize: 14, color: user?.emailVerified ? '#AABC99' : '#e57373', fontWeight: '500', marginLeft: 4 }}>
                {user?.emailVerified ? '인증' : '미인증'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, color: '#2b2b2b', fontWeight: '500', flex: 1 }}>{user?.email ?? '-'}</Text>
              <MaterialIcons name="chevron-right" size={18} color="#bbb" />
            </View>
          </View>

          {/* 이메일-닉네임 사이 구분선 */}
          <View style={{ width: '100%', height: 1, backgroundColor: '#eee', marginVertical: 16 }} />

          {/* 닉네임 탭 */}
          <View style={{ width: '100%', overflow: 'hidden' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 14, color: '#888' }}>닉네임</Text>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, color: '#2b2b2b', fontWeight: '500', flex: 1 }}>{user?.displayName ?? '-'}</Text>

              {/* 오른쪽 화살표 */}
              <MaterialIcons name="chevron-right" size={18} color="#bbb" />
            </View>
          </View>

          <View style={{ width: '100%', height: 1, backgroundColor: '#eee', marginVertical: 16 }} />

        </ScrollView>
        {/* 로그아웃 버튼을 하단에 고정, SafeAreaView로 네비게이션과 겹침 방지 */}
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 24}}>
          <CustomButton
            buttonText="로그아웃"
            onPress={async () => {
              await logOut();
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;