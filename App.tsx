import * as React from 'react';
import { TextModalProvider } from './src/components/modals/TextModalProvider';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';

export default function App() {
  return (
    <TextModalProvider>
      <NavigationContainer>
          <StackNavigator />
      </NavigationContainer>
    </TextModalProvider>
  );
}