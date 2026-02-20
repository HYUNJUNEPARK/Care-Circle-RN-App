import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import useTextModal from '../../components/modals/useTextModal';
import CustomButton from '../../components/buttons/CustomButton';
import Input from '../../components/inputs/Input';
import colors from '../../styles/colors';
import { useState } from 'react';
import { appIcon, appText } from '../../assets';

interface SignInScreenProps {
  navigation: any;
}

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const state = navigation.getState();
  const routes = state.routes;
  const { showAlert } = useTextModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberId, setRememberId] = useState(false);
  
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        padding: 24,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 18,
          padding: 22,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Image
            source={appIcon}
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
            }}
          />
          <Image
            source={appText}
            style={{
              width: 100,
              height: 32,
              resizeMode: 'contain',
            }}
          />
        </View>
        <Input
          inputType="plaintext"
          id="email"
          label=""
          placeholder="your@email.com"
          value={email}
          onChange={setEmail}
        />
        <Input
          inputType="password"
          id="password"
          label=""
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          show={showPassword}
          setShow={setShowPassword}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 8,
          }}
        >
          {/* <Checkbox
            status={rememberId ? 'checked' : 'unchecked'}
            onPress={() => setRememberId(!rememberId)}
            color="#2563eb"
            uncheckedColor="#d1d5db"
          /> */}
          <Text
            style={{
              marginLeft: 8,
              fontSize: 14,
              fontWeight: '700',
              color: '#4b5563',
            }}
          >
            아이디 기억하기
          </Text>
        </View>
        <CustomButton
          style={{
            marginTop: 18,
          }}
          buttonText="로그인"
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#d1d5db',
            }}
          />
          <Text
            style={{
              marginHorizontal: 16,
              fontWeight: '700',
              color: '#6b7280',
              fontSize: 14,
            }}
          >
            또는
          </Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#d1d5db',
            }}
          />
        </View>
      </View>

      <CustomButton buttonText="Google" />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 24,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: '#4b5563',
            marginRight: 8,
          }}
        >
          계정이 없으신가요?
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: '#2563eb',
            }}
          >
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;
