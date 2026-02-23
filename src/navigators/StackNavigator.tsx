import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SignUpScreen from '../screens/signup/SignUpScreen';
import SignInScreen from '../screens/signin/SignInScreen';

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
                    headerShown: false,
                    // title: '로그인',
                    // headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    );
}