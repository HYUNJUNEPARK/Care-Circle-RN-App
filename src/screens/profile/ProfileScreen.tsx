import { BackHandler } from 'react-native';
import useBackHandler from '../../hooks/useBackHandler';
import useTextModal from '../../components/modals/useTextModal';
import GuestProfileScreen from './GuestProfileScreen';
import LoggedInProfileScreen from './LoggedInProfileScreen';
import useAuth from '../../auth/useAuth';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const state = navigation.getState();
  const routes = state.routes;
  const { showAlert } = useTextModal();
  const { user, userInfo } = useAuth();

  useBackHandler({
    onBackPress: () => {
      // 네비게이션 스택에 뒤로 갈 화면이 없거나, 루트 스택이 바로 아래에 있을 때
      if (!navigation.canGoBack() || routes.length === 2) {
        showAlert({
          title: '앱을 종료하시겠습니까?',
          message: '앱을 종료하려면 확인을 눌러주세요.',
          onConfirmAction: () => {
            BackHandler.exitApp();
          }
        });
        return true;
      }
      navigation.goBack();
      return true;
    }
  });

  return userInfo ? (
    //로그인 상태 사용자 프로필 화면
    <LoggedInProfileScreen />
  ) : (
    //미로그인 시 로그인 화면
    <GuestProfileScreen navigation={navigation} />
  );

};

export default ProfileScreen;