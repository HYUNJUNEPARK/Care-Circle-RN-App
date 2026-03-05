import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, KeyboardAvoidingView, SafeAreaView, TouchableOpacity } from 'react-native';
import useAuth from '../../auth/useAuth';


const MAX_LENGTH = 20;

const EditNicknameScreen = () => {
    const { user } = useAuth();
    const [name, setName] = useState(user?.displayName ?? '');

    const handleSave = () => {
        console.log('저장된 이름:', name);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
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
                        <Text style={{ fontSize: 14, color: '#888888' }}>이름</Text>
                        <Text style={{ fontSize: 14, color: '#888888' }}>
                            {name.length}/{MAX_LENGTH}
                        </Text>
                    </View>

                    {/* TextInput */}
                    <TextInput
                        value={name}
                        onChangeText={(text) => {
                            if (text.length <= MAX_LENGTH) setName(text);
                        }}
                        maxLength={MAX_LENGTH}
                        style={{
                            fontSize: 22,
                            fontWeight: '700',
                            color: '#111111',
                            paddingVertical: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#e0e0e0',
                        }}
                        placeholder="이름을 입력하세요"
                        placeholderTextColor="#cccccc"
                        autoFocus={false}
                    />
                </View>

                {/* 하단 저장 버튼 */}
                <TouchableOpacity
                    onPress={handleSave}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: '#e8e8e8',
                        paddingVertical: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ fontSize: 16, color: '#555555', fontWeight: '500' }}>
                        저장
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditNicknameScreen;
