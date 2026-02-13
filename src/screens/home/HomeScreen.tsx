import { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import { BackHandler } from 'react-native';
import useTextModal from '../../components/modals/useTextModal';
import useBackHandler from '../../hooks/useBackHandler';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const webViewRef = useRef<WebView>(null);
  const canGoBack = useRef(false);
  const { showAlert } = useTextModal();

  useBackHandler({
    onBackPress: () => {
      // WebView가 뒤로 갈 수 있으면 goBack() 호출
      if (canGoBack.current && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      if (!canGoBack.current) {
        showAlert({
          title: '앱을 종료하시겠습니까?',
          message: '앱을 종료하려면 확인을 눌러주세요.',
          onConfirmAction: () => {
            BackHandler.exitApp();
          }
        });
        return true;
      }
      // WebView가 더 이상 뒤로 갈 수 없으면 앱 종료 허용
      return false;
    }
  });

  /**
   * 웹뷰 내비게이션 상태 변경 핸들러
   */
  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    canGoBack.current = navState.canGoBack;
  }

  /**
   * 웹뷰에서 메시지 수신 핸들러
   */
  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'NAVIGATE_SIGN_IN') {
        navigation.navigate('Profile')
      }
    } catch (e) {
      // 메시지 파싱 실패 시 무시
      console.error('Failed to parse message from WebView:', e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'http://127.0.0.1:5173' }}
        style={{ flex: 1 }}
        onNavigationStateChange={handleNavigationStateChange} //웹페이지를 이동할 때마다 onNavigationStateChange 호출
        onMessage={handleWebViewMessage}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
