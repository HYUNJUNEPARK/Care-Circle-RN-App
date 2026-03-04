import React from 'react';
import useAuth from '../../auth/useAuth';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';


type SettingItem = {
  icon: string;
  label: string;
  onPress?: () => void;
};

type SettingSection = {
  title?: string;
  items: SettingItem[];
};

const SETTINGS: SettingSection[] = [
  {
    items: [
      { icon: '👤', label: '프로필' },
    ],
  },
  {
    title: '개인 정보',
    items: [
      { icon: '🪪', label: '계정' },
      { icon: '🔒', label: '개인 정보 보호' },
    ],
  },
  {
    title: '백업 및 이전',
    items: [
      { icon: '💬', label: '대화 백업 및 복원' },
      { icon: '📷', label: 'QR 코드 간편 이전' },
      { icon: '🛡️', label: '계정 이전' },
    ],
  },
  {
    title: '샵',
    items: [
      { icon: '😊', label: '스티커' },
      { icon: '🎨', label: '테마' },
      { icon: '🪙', label: '코인' },
    ],
  },
];

const SettingRow = ({
  icon,
  label,
  onPress,
  isFirst,
  isLast,
}: SettingItem & { isFirst: boolean; isLast: boolean }) => (
  <TouchableOpacity
    onPress={onPress}
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
      borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
      borderBottomColor: '#E8E8E8',
    }}
  >
    <Text style={{ fontSize: 20, width: 32, textAlign: 'center', marginRight: 12 }}>
      {icon}
    </Text>
    <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: '#191919', letterSpacing: -0.2 }}>
      {label}
    </Text>
    <Text style={{ fontSize: 22, color: '#C4C4C4', lineHeight: 24 }}>›</Text>
  </TouchableOpacity>
);


const SettingSectionBlock = ({ section }: { section: SettingSection }) => (
  <View style={{ marginTop: 8, paddingHorizontal: 16 }}>
    {section.title && (
      <Text style={{
        fontSize: 13,
        fontWeight: '500',
        color: '#8C8C8C',
        marginTop: 20,
        marginBottom: 6,
        marginLeft: 4,
        letterSpacing: -0.1,
      }}>
        {section.title}
      </Text>
    )}
    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden' }}>
      {section.items.map((item, idx) => (
        <SettingRow
          key={item.label}
          {...item}
          isFirst={idx === 0}
          isLast={idx === section.items.length - 1}
        />
      ))}
    </View>
  </View>
);

/**
 * 로그인 사용자 프로필 화면 컴포넌트
 * 로그인한 사용자가 프로필 화면에 접근했을 때 보여지는 화면
 */
const LoggedInProfileScreen = () => {
  const { userInfo, logout } = useAuth();


  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* <StatusBar barStyle="dark-content" backgroundColor="#F2F3F5" /> */}

      <Button title="로그아웃" onPress={logout} />

      {SETTINGS.map((section, idx) => (
        <SettingSectionBlock key={idx} section={section} />
      ))}
    </ScrollView>
  );
};




export default LoggedInProfileScreen;