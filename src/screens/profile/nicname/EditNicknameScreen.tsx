import React, { useState } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../../../auth/useAuth';
import RectangleButton from '../../../components/buttons/RectangleButton';
import LabeledCounterInput from '../../../components/inputs/LabeledCounterInput';

const MAX_LENGTH = 20;

const EditNicknameScreen = () => {
    const { user } = useAuth();
    const [name, setName] = useState(user?.displayName ?? '');

    const handleSave = () => {
        console.log('저장된 이름:', name);
    };

    // 버튼 활성화 조건: 이름이 1글자 이상일 때
    const isButtonEnabled = name.trim().length > 0;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['bottom']}>
            {/* 하단 저장 버튼이 키보드 위로 올라옴 */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={Platform.OS === 'android' ? 90 : 88} // 헤더 높이에 맞게 조정
            >
                <LabeledCounterInput
                    label="닉네임"
                    value={name}
                    onChangeText={setName}
                    maxLength={MAX_LENGTH}
                    placeholder="닉네임을 입력해 주세요"
                    style={{ paddingHorizontal: 20, paddingTop: 24, flex: 1 }}
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

export default EditNicknameScreen;
