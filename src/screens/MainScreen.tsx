import { useRef, useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { BackHandler, Platform } from 'react-native';
import { Alert } from 'react-native';

interface MainScreenProps {
  navigation: any;
}

const MainScreen = ({ navigation }: MainScreenProps) => {
  // WebView의 ref를 생성하고 타입을 지정합니다.
  const webViewRef = useRef<WebView>(null);
  // WebView가 뒤로 갈 수 있는지 상태를 저장합니다.
  const [canGoBack, setCanGoBack] = useState(false);

  // 안드로이드에서 시스템 백버튼을 눌렀을 때 동작을 정의합니다.
  useEffect(() => {
    if (Platform.OS === 'android') {
      // 백버튼 이벤트 핸들러
      const onBackPress = () => {
        if (!canGoBack) {
          Alert.alert('제목', '메시지', [
            { text: '확인', onPress: () => BackHandler.exitApp() },
            { text: '취소', style: 'cancel' }
          ]);
          return true
        }

        // WebView가 뒤로 갈 수 있으면 goBack() 호출
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true; // 기본 동작(앱 종료) 방지
        }

        // WebView가 더 이상 뒤로 갈 수 없으면 앱 종료 허용
        return false;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      // 컴포넌트 언마운트 시 이벤트 제거
      return () => {
        backHandler.remove();
      };
    }
  }, [canGoBack]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'http://127.0.0.1:5173' }}
        style={{ flex: 1 }}
        //웹페이지를 이동할 때마다 onNavigationStateChange 호출
        onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
      />
    </SafeAreaView>
  );
};

export default MainScreen;
