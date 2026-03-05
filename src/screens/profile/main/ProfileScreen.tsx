import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileItemTab from './components/ProfileItemTab';
import PlainTab from './components/PlainTab';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../../components/buttons/CustomButton';
import useAuth from '../../../auth/useAuth';
import { appIcon } from '../../../../assets';

interface ProfileScreenProps {
  navigation: any;
}

/**
 * 로그인 사용자 프로필 화면 컴포넌트
 * 로그인한 사용자가 프로필 화면에 접근했을 때 보여지는 화면
 */
const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { user, logOut } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
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

          <ProfileItemTab
            label="아이디"
            value={user?.email ?? ''}
            showArrow={false}
          />

          <ProfileItemTab
            label="이메일"
            value={user?.email ?? ''}
            showVerifiedIcon={user?.emailVerified}
            onPress={() => { }}
          />

          <ProfileItemTab
            label="닉네임"
            value={user?.displayName ?? '-'}
            onPress={() => {
              navigation.navigate('EditNicknameScreen')
            }}
          />
        </View>

        {/* 하단 영역 */}
        <View style={{ marginTop: 'auto', alignItems: 'center' }}>


          <PlainTab
            label="로그아웃"
            onPress={async () => {
              await logOut();
              navigation.goBack();
            }}
          />

          <PlainTab
            label="계정탈퇴"
            onPress={() => {

            }}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;