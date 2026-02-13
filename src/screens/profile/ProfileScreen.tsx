
import { View, Text, Button, StyleSheet, BackHandler, Platform, ScrollView } from 'react-native';
import useBackHandler from '../../hooks/useBackHandler';
import useTextModal from '../../components/modal/useTextModal';
import CustomButton from '../../components/buttons/CustomButton';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const state = navigation.getState();
  const routes = state.routes;
  const { showAlert } = useTextModal();

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

  // TODO: 실제 사용자 정보는 props/context 등에서 받아와야 함. 임시 하드코딩
  const user = {
    name: '홍길동',
    email: 'honggildong@email.com',
  };

  return (

    <ScrollView showsVerticalScrollIndicator={false}>
      {/* 사용자 정보 카드 */}
      <View>
        <Text>asdfsdafsad</Text>

        <CustomButton loading={true}></CustomButton>

      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
