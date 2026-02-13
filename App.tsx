import * as React from 'react';
import { TextModalProvider } from './src/components/TextModalProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './src/screens/MainScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { RootStackParamList } from './src/types/navigation';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  return (
    <TextModalProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor:  '#AABC99', //'#5C9A87',// 활성 아이콘 색상
            tabBarInactiveTintColor: 'gray', // 비활성 아이콘 색상
          }}
        >
          <Tab.Screen
            name="Home"
            component={MainScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: '프로필',
              headerTitleAlign: 'center',
              tabBarIcon: ({ color, size }) => (
                <Octicons name="person" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TextModalProvider>
  );
}