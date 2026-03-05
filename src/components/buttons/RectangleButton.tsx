import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import colors from '../../styles/colors';

interface RectangleButtonProps {
    title: string;
    onPress?: () => void;
    enabled?: boolean;
    style?: ViewStyle;
}

function RectangleButton({
    title,
    onPress,
    enabled = true,
    style
}: RectangleButtonProps) {
    return (
        <TouchableOpacity
            onPress={enabled ? onPress : undefined}
            style={{
                paddingVertical: 18,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: enabled ? colors.primary : '#e8e8e8',
                ...(style || {}),
            }}
            disabled={!enabled}
        >
            <Text style={{
                fontSize: 16,
                color: enabled ? '#ffffff' : '#555555',
                fontWeight: '600'
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default RectangleButton;
