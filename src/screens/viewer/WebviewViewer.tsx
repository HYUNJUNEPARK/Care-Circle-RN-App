import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WebviewViewer = () => {
  //const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { uri } = route.params || {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* <View
        style={{
          height: 56,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: '#f5f5f5',
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
        }}
      >
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={{ padding: 8 }} onPress={handleClose}>
          <Text style={{ fontSize: 16, color: '#007AFF', fontWeight: 'bold' }}>닫기</Text>
        </TouchableOpacity>
      </View> */}
      {uri ? (
        <WebView source={{ uri }} style={{ flex: 1 }} />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>잘못된 접근입니다.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WebviewViewer;
