import * as React from 'react';
import { TextModalProvider } from './src/components/modals/TextModalProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/home/HomeScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import { RootStackParamList } from './src/types/navigation';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from './src/styles/colors';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  return (
    <TextModalProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor:  colors.primary,
            tabBarInactiveTintColor: 'gray', // 비활성 아이콘 색상
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
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