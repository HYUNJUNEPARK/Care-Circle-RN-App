import * as React from 'react';
import { TextModalProvider } from './src/components/modals/TextModalProvider';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';
import { useAuth } from './src/auth/useAuth';

export default function App() {
  const { user, loading } = useAuth();

  


  return (
    <TextModalProvider>
      <NavigationContainer>
          <StackNavigator />
      </NavigationContainer>
    </TextModalProvider>
  );
}