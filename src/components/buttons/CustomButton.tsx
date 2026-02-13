
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import LoadingSpinner from '../loadings/spinner/LoadingSpinner';
import colors from '../../styles/colors';

interface CustomButtonProps {
  enabled?: boolean;
  loading?: boolean;
  buttonText?: string;
  loadingText?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

const CustomButton = ({
  enabled = true,
  loading = false,
  buttonText,
  loadingText,
  style,
  textStyle,
  onPress,
}: CustomButtonProps) => {
  const isDisabled = loading || !enabled;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
      disabled={isDisabled}
      onPress={onPress}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          {/* RN ActivityIndicator 또는 커스텀 스피너 */}
          <LoadingSpinner />
          {loadingText ? <Text style={[styles.loadingText, textStyle]}>{loadingText}</Text> : null}
        </View>
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 136,
    height: 52,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default CustomButton;

