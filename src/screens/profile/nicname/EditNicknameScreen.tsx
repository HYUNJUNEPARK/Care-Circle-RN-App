import React, { useState } from 'react';
import { View, Text, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../../../auth/useAuth';
import RectangleButton from '../../../components/buttons/RectangleButton';

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
                {/* 콘텐츠 영역 */}
                <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 24 }}>
                    {/* 이름 라벨 + 글자 수 카운터 */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 8,
                        }}
                    >
                        <Text style={{ fontSize: 14, color: '#888888' }}>닉네임</Text>
                        <Text style={{ fontSize: 14, color: '#888888' }}>
                            {name.length}/{MAX_LENGTH}
                        </Text>
                    </View>

                    {/* TextInput */}
                    <TextInput
                        value={name}
                        onChangeText={(text) => {
                            if (text.length <= MAX_LENGTH) {
                                setName(text);
                            }
                        }}
                        maxLength={MAX_LENGTH}
                        style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: '#111111',
                            paddingVertical: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#e0e0e0',
                        }}
                        placeholder="닉네임을 입력해 주세요"
                        placeholderTextColor="#cccccc"
                        autoFocus={false}
                    />
                </View>

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
