import React, { useState } from 'react';
import { Platform, KeyboardAvoidingView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../../../auth/useAuth';
import RectangleButton from '../../../components/buttons/RectangleButton';
import LabeledCounterInput from '../../../components/inputs/LabeledCounterInput';
import useUpdateNickname from './useUpdateNickname';

const EditNicknameScreen = () => {
    const { user } = useAuth();
    const [name, setName] = useState(user?.displayName ?? '');
    const { update, loading, error } = useUpdateNickname();
    const isButtonEnabled = name.trim().length > 0; // 버튼 활성화 조건: 이름이 1글자 이상일 때

    const handleUpdateNickname = () => {
        update(name);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['bottom']}>
            {/* 하단 저장 버튼이 키보드 위로 올라옴 */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={Platform.OS === 'android' ? 90 : 88} // 헤더 높이에 맞게 조정
            >
                <View
                    style={{ paddingHorizontal: 20, paddingTop: 24, flex: 1 }}>
                    <LabeledCounterInput
                        label="닉네임"
                        value={name}
                        onChangeText={setName}
                        maxLength={20}
                        placeholder="닉네임을 입력해 주세요"

                    />
                    <Text style={{ color: 'red', marginTop: 16 }}>
                        {error}
                    </Text>
                </View>

                <RectangleButton
                    title="등록"
                    enabled={isButtonEnabled}
                    onPress={() => {
                        handleUpdateNickname();
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditNicknameScreen;
