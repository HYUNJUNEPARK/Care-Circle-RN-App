import React from 'react';
import { View, Text } from 'react-native';

interface PlainTabProps {
  onPress?: () => void;
  label: string;
  textColor?: string;
}

function PlainTab({
  onPress,
  label,
  textColor = '#2b2b2b'
}: PlainTabProps) {
  return (
    <View style={{ flexDirection: 'column', width: '100%' }}>
      <View style={{ width: '100%', height: 1, backgroundColor: '#eee' }} />
      <Text
        style={{ color: textColor, fontSize: 16, fontWeight: '500', marginVertical: 18 }}
        onPress={onPress}
      >
        {label}
      </Text>
    </View>
  );
}


export default PlainTab;
