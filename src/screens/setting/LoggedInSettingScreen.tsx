import React from 'react';
import useAuth from '../../auth/useAuth';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type SettingItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  path?: string;
};

type SettingSection = {
  title?: string;
  items: SettingItem[];
};

const SETTINGS: SettingSection[] = [
  {
    title: '개인 정보',
    items: [
      { icon: 'id-card-outline', label: '계정' },
      { icon: 'lock-closed-outline', label: '개인 정보 보호' },
    ],
  },

  {
    title: '개인 정보',
    items: [
      { icon: 'person-outline', label: '프로필' },
      { icon: 'id-card-outline', label: '계정' },
      { icon: 'lock-closed-outline', label: '개인 정보 보호' },
    ],
  },
];

const SettingSectionBlock = ({ section }: { section: SettingSection }) => (
  <View>
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
      {section.items.map((item, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === section.items.length - 1;
        return (
          <TouchableOpacity
            key={item.label}
            onPress={() => {
              if (item.path) {
                // Navigate to the specified path
              }
            }}
            activeOpacity={0.6}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              paddingHorizontal: 16,
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: isFirst ? 12 : 0,
              borderTopRightRadius: isFirst ? 12 : 0,
              borderBottomLeftRadius: isLast ? 12 : 0,
              borderBottomRightRadius: isLast ? 12 : 0,
              // borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
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
);

/**
 * 로그인 사용자 설정 화면 컴포넌트
 * 로그인한 사용자가 설정 화면에 접근했을 때 보여지는 화면
 */
const LoggedInSettingScreen = () => {
  const { userInfo, logout } = useAuth();

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16
      }}
    // showsVerticalScrollIndicator={false}
    >
      {/* <StatusBar barStyle="dark-content" backgroundColor="#F2F3F5" /> */}

      <TouchableOpacity
        onPress={() => {

        }}
        activeOpacity={0.6}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 16,
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          borderBottomColor: '#E8E8E8',
        }}
      >
        <Ionicons
          name={'person-outline'}
          size={24}
          color="#191919"
          style={{ width: 32, textAlign: 'center', marginRight: 12 }}
        />
        <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: '#191919' }}>
          프로필
        </Text>
        <Text style={{ fontSize: 22, color: '#C4C4C4' }}>›</Text>
      </TouchableOpacity>


      {SETTINGS.map((section, idx) => (
        <SettingSectionBlock key={idx} section={section} />
      ))}

      <Button title="로그아웃" onPress={logout} />
    </ScrollView>
  );
};




export default LoggedInSettingScreen;