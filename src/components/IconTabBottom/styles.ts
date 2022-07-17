import { Feather } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

type IconProps = {
  focused: boolean
}

export const Icon = styled<any>(Feather)<IconProps>`
  ${({ focused, theme }) => css`
    font-size: ${RFValue(20)}px;
    color: ${focused ? theme.colors.secondary : theme.colors.text_dark};
  `}
`;