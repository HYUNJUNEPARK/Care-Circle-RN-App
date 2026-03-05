import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import useAuth from '../../auth/useAuth';
import CircleProfileImage from '../../components/images/CircleProfileImage';
import { WebviewViewerTitleType } from '../viewer/WebviewViewer';
import { PRIVACY_URL, TERMS_URL } from '../../consts/url';

type SettingItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  type?: WebviewViewerTitleType;
  path?: string;
  url?: string;
};

type SettingSection = {
  title?: string;
  items: SettingItem[];
};

const SETTINGS: SettingSection[] = [
  {
    title: '앱 정보',
    items: [
      { icon: 'megaphone-outline', label: '공지사항' },
      { icon: 'shield-checkmark-outline', label: '개인 정보 처리 방침', type: WebviewViewerTitleType.Privacy, path: 'WebviewViewer', url: PRIVACY_URL },
      { icon: 'document-text-outline', label: '이용 약관', type: WebviewViewerTitleType.Terms, path: 'WebviewViewer', url: TERMS_URL },
    ],
  },
];


interface LoggedInSettingScreenProps {
  navigation: any;
}

/**
 * 로그인 사용자 설정 화면 컴포넌트
 * 로그인한 사용자가 설정 화면에 접근했을 때 보여지는 화면
 */

const LoggedInSettingScreen = ({ navigation }: LoggedInSettingScreenProps) => {
  const { userInfo, user } = useAuth();

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}
        activeOpacity={0.6}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 16,
          paddingHorizontal: 12,
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          borderBottomColor: '#E8E8E8',
        }}
      >
        <CircleProfileImage
          imgUrl={user?.photoURL}
          size={26}
        />
        <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: '#191919', marginLeft: 12 }}>
          {user?.displayName ?? user?.email}
        </Text>
        <Text style={{ fontSize: 22, color: '#C4C4C4' }}>›</Text>
      </TouchableOpacity>

      {/* Setting Sections Inline */}
      {SETTINGS.map((section, idx) => (
        <View key={idx}>
          {section.title && (
            <Text style={{
              fontSize: 13,
              fontWeight: '500',
              color: '#8C8C8C',
              marginTop: 20,
              marginBottom: 6,
              marginLeft: 4,
            }}>
              {section.title}
            </Text>
          )}
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden' }}>
            {section.items.map((item, itemIdx) => {
              const isFirst = itemIdx === 0;
              const isLast = itemIdx === section.items.length - 1;
              return (
                <TouchableOpacity
                  key={item.label}
                  onPress={() => {
                    // WebviewViewer로 이동 (예시 URI 사용)
                    if (item.path == "WebviewViewer" && item.url) {
                      navigation.navigate(item.path, { uri: item.url, type: item.type });
                    }


                  }}
                  activeOpacity={0.6}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 16,
                    paddingHorizontal: 12,
                    backgroundColor: '#FFFFFF',
                    borderTopLeftRadius: isFirst ? 12 : 0,
                    borderTopRightRadius: isFirst ? 12 : 0,
                    borderBottomLeftRadius: isLast ? 12 : 0,
                    borderBottomRightRadius: isLast ? 12 : 0,
                    borderBottomColor: '#E8E8E8',
                  }}
                >
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color="#191919"
                    style={{ width: 32, textAlign: 'center', marginRight: 12 }}
                  />
                  <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: '#191919' }}>
                    {item.label}
                  </Text>
                  <Text style={{ fontSize: 22, color: '#C4C4C4' }}>›</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default LoggedInSettingScreen;