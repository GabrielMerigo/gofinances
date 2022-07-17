import { DefaultTheme } from "styled-components/native"
import * as S from './styles';

type IconTabBottomProps = {
  focused: boolean,
  theme: DefaultTheme,
  nameIcon: string
}

export function IconTabBottom({ focused, theme, nameIcon }: IconTabBottomProps) {
  return (
    <S.Icon focused={focused} name={nameIcon} color={theme.colors.secondary} />
  )
}