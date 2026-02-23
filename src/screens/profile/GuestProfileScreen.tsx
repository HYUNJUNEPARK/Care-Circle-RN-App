import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';


interface GuestProfileScreenProps {
  navigation: any;
}


/**
 * 미로그인 사용자 프로필 화면 컴포넌트
 * 로그인하지 않은 사용자가 프로필 화면에 접근했을 때 보여지는 화면
 */
const GuestProfileScreen = ({ navigation }: GuestProfileScreenProps) => {


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text style={{ marginBottom: 24 }}>미로그인 사용자 프로필 화면</Text> */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          // 로그인 화면으로 이동하는 로직을 여기에 추가
          navigation.navigate('SignIn');

        }}
      >
        <Text style={styles.loginButtonText}>로그인 하기 {'>'}</Text>
        <View style={styles.platformImagesContainer}>
          <View style={styles.circleImage}>
            {/* 로그인 플랫폼 이미지 1 */}
            <Image
              // source={require('../../assets/img/placeholder1.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.circleImage}>
            {/* 로그인 플랫폼 이미지 2 */}
            <Image
              // source={require('../../assets/img/placeholder2.png')}
              style={styles.image}
            />
          </View>
        </View>

      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  loginButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#f2f2f2',
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
    backgroundColor: '#e0e0e0',
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

export default GuestProfileScreen;