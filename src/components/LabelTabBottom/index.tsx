import { Text } from "react-native";
import { DefaultTheme } from "styled-components/native";

type LabelTabBottomProps = {
  focused: boolean,
  theme: DefaultTheme,
  label: string
}

export function LabelTabBottom({ focused, theme, label }: LabelTabBottomProps) {
  return (
    <Text style={{
      color: focused ? theme.colors.secondary : theme.colors.text_dark,
      fontFamily: theme.fonts.regular,
      fontSize: 14
    }}>
      {label}
    </Text>
  )
}