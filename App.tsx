import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

// 1. Navigation 타입 정의
type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

// 2. 화면(Screen) 컴포넌트 정의

// 홈 화면
function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈 화sss면 (Home)</Text>
      <Text style={styles.text}>React Navigation이 적용되었습니다.</Text>
      <Button
        title="상세 페이지로 이동"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

// 상세 화면
function DetailsScreen({ navigation }: DetailsScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>상세 화면 (Details)</Text>
      <Button
        title="홈으로 돌아가기"
        onPress={() => navigation.goBack()} // 또는 navigation.navigate('Home')
      />
    </View>
  );
}

// 3. Stack Navigator 생성
const Stack = createNativeStackNavigator<RootStackParamList>();

// 4. App 컴포넌트에서 NavigationContainer와 Stack 설정
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: '메인' }} // 헤더 제목 설정
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: '상세 정보' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
});