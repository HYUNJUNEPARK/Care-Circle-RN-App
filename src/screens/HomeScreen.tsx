import { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { BackHandler, Platform } from 'react-native';
import useTextModal from '../components/modal/useTextModal';
import useBackHandler from './useBackHandler';

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

export default HomeScreen;
