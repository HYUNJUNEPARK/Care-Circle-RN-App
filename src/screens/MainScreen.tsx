import { useRef, useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { BackHandler, Platform } from 'react-native';
import useTextModal from '../components/useTextModal';

interface MainScreenProps {
  navigation: any;
}

const MainScreen = ({ navigation }: MainScreenProps) => {
  const webViewRef = useRef<WebView>(null);
  const canGoBack = useRef(false);
  const { showAlert } = useTextModal();

  // 안드로이드에서 시스템 백버튼을 눌렀을 때 동작을 정의합니다.
  useEffect(() => {
    if (Platform.OS === 'android') {
      // 백버튼 이벤트 핸들러
      const onBackPress = () => {
        // WebView가 뒤로 갈 수 있으면 goBack() 호출
        if (canGoBack.current && webViewRef.current) {
          webViewRef.current.goBack();
          return true; // 기본 동작(앱 종료) 방지
        }

        if (!canGoBack.current) {
          showAlert({
            title: '제목',
            message: '메시지',
            confirmText: '확인',
            onConfirmAction: () => {
              BackHandler.exitApp();
            },
            cancelText: '취소',
            onCancelAction: () => {},
          });
          return true;
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
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'http://127.0.0.1:5173' }}
        style={{ flex: 1 }}
        //웹페이지를 이동할 때마다 onNavigationStateChange 호출
        onNavigationStateChange={navState =>
          canGoBack.current = navState.canGoBack
        }
      />
    </SafeAreaView>
  );
};

export default MainScreen;
