import * as React from 'react';
import { TextModalProvider } from './src/components/modals/TextModalProvider';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';
import { AuthProvider } from './src/auth/AuthProvider';

export default function App() {
  return (
    <TextModalProvider>
      <AuthProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </AuthProvider>
    </TextModalProvider>
  );
}