import React, { useState } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../../../auth/useAuth';
import RectangleButton from '../../../components/buttons/RectangleButton';
import LabeledCounterInput from '../../../components/inputs/LabeledCounterInput';

const EditEmailScreen = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState(user?.email ?? '');

    const handleSave = () => {
        console.log('저장된 이메일:', email);
    };

    // 버튼 활성화 조건: 이메일이 1글자 이상일 때
    const isButtonEnabled = email.trim().length > 0;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['bottom']}>
            {/* 하단 저장 버튼이 키보드 위로 올라옴 */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={Platform.OS === 'android' ? 90 : 88}
            >
                <LabeledCounterInput
                    label="이메일"
                    placeholder="이메일을 입력해 주세요"
                    value={email}
                    style={{
                        paddingHorizontal: 20,
                        paddingTop: 24,
                    }}
                    onChangeText={(inputEmail) => {
                        setEmail(inputEmail);
                    }}
                />

                <RectangleButton
                    title="저장"
                    enabled={isButtonEnabled}
                    onPress={() => {
                        handleSave();
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditEmailScreen;
