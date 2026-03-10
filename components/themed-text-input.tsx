import { StyleSheet, TextInput, type TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/constants/theme';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  placeholderLightColor?: string;
  placeholderDarkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  placeholderLightColor,
  placeholderDarkColor,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text') as string;
  const placeholderColor = useThemeColor(
    { light: placeholderLightColor, dark: placeholderDarkColor },
    'placeholder'
  ) as string;

  return (
    <TextInput
      style={[{ color }, style]}
      placeholderTextColor={placeholderColor}
      {...rest}
    />
  );
}
