import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import Input from '../../components/inputs/Input';
import colors from '../../styles/colors';
import { useEffect, useState } from 'react';
import { appIcon, appText } from '../../assets';
import Checkbox from 'expo-checkbox';
import { storage, StorageKeys } from '../../utils/storage';
import useAuth from '../../auth/useAuth';


interface SignInScreenProps {
  navigation: any;
}

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const [id, setId] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithEmail, isLoading } = useAuth();


  //최초 진입 시 저장된 아이디 불러오기
  useEffect(() => {
    //저장된 아이디 불러오기
    const loadSavedId = async () => {
      try {
        const savedId = await storage.get<string>(StorageKeys.REMEMBERED_USER_ID);
        if (savedId) {
          setId(savedId);
          setRememberId(true);
        }
      } catch (e) {
        console.log('아이디 불러오기 실패', e);
      }
    };
    loadSavedId();
  }, []);

  //아이디 기억하기
  useEffect(() => {
    const updateRememberedId = async () => {
      // 체크 해제 시 즉시 삭제
      if (!rememberId) {
        await storage.remove(StorageKeys.REMEMBERED_USER_ID);
      } else {
        // 체크를 켰는데 id가 이미 있으면 즉시 저장
        if (id.trim()) await storage.set<string>(StorageKeys.REMEMBERED_USER_ID, id.trim());
      }
    };
    updateRememberedId();
  }, [rememberId]);

  //로그인 처리
  const handleLogin = async () => {
    try {
      if (!id.trim() || !password) return;

      const isSucess = await loginWithEmail(id.trim(), password);
      if (isSucess) {
        navigation.goBack();
      }

    } catch (e) {
      console.log('로그인 실패', e);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        padding: 12,
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
          placeholder="아이디"
          value={id}
          onChange={setId}
        />
        <Input
          inputType="password"
          id="password"
          label=""
          placeholder="비밀번호"
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              value={rememberId}
              onValueChange={setRememberId}
              color={colors.primary}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: '#4b5563',
              }}
            >
              아이디 기억하기
            </Text>
          </View>
        </View>
        <CustomButton
          style={{
            marginTop: 18,
          }}
          buttonText='로그인'
          loading={isLoading}
          onPress={handleLogin}
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
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: colors.primary,
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
