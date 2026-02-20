import * as React from 'react';
import { TextModalProvider } from './src/components/modals/TextModalProvider';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigators/TabNavigator';

export default function App() {
  return (
    <TextModalProvider>
      <NavigationContainer>
          <TabNavigator />
      </NavigationContainer>
    </TextModalProvider>
  );
}