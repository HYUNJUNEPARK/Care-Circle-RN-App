import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export enum WebviewViewerTitleType {
    Privacy = 'Privacy',
    Terms = 'Terms',
}

interface WebviewViewerProps {
    navigation: any;
}

const WebviewViewer = ({ navigation }: WebviewViewerProps) => {
    const route = useRoute();
    // @ts-ignore
    const { uri, type } = route.params || {};

    useEffect(() => {
        let title = '';
        switch (type) {
            case WebviewViewerTitleType.Privacy:
                title = '개인 정보 처리 방침';
                break;
            case WebviewViewerTitleType.Terms:
                title = '이용 약관';
                break;
            default:
                title = '';
        }
        navigation.setOptions({ title });
    }, [navigation, type]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
