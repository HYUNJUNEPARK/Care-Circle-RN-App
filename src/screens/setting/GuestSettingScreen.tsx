import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import RoundedButton from '../../components/buttons/RoundedButton';

interface GuestSettingScreenProps {
  navigation: any;
}


/**
 * 미로그인 사용자 설정 화면 컴포넌트
 * 로그인하지 않은 사용자가 설정 화면에 접근했을 때 보여지는 화면
 */
const GuestSettingScreen = ({ navigation }: GuestSettingScreenProps) => {


  return (
    <ScrollView>
      <View style={{ paddingVertical: 16, paddingHorizontal: 8 }}>


        <Text style={{ fontSize: 16, marginBottom: 12 }}>
          로그인하고 더 많은 기능을 이용해보세요.
        </Text>

        <RoundedButton
          buttonText='로그인 하기'
          onPress={() => {
            navigation.navigate('SignIn');
          }} />

      </View>
    </ScrollView>

  );
};


const styles = StyleSheet.create({
  loginButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 24,
    marginTop: 16,
  },
  platformImagesContainer: {
    flexDirection: 'row',
    marginRight: 12,
  },
  circleImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default GuestSettingScreen;