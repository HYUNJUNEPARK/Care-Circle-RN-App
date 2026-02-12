import React, { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { BackHandler, Platform } from 'react-native';

interface MainScreenProps {
  navigation: any;
}

const MainScreen = ({ navigation }: MainScreenProps) => {

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <WebView
        source={{ uri: 'http://127.0.0.1:5173' }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default MainScreen;
