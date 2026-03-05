import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SignUpScreen from '../screens/signup/SignUpScreen';
import SignInScreen from '../screens/signin/SignInScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditNicknameScreen from '../screens/edit/nickname/EditNicknameScreen';
import EditEmailScreen from '../screens/edit/email/EditEmailScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    title: '회원가입',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                    title: '로그인',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: '프로필',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="EditNicknameScreen"
                component={EditNicknameScreen}
                options={{
                    title: '닉네임',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="EditEmailScreen"
                component={EditEmailScreen}
                options={{
                    title: '이메일',
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    );
}