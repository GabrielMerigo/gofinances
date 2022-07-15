import { Feather } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

type IconProps = {
  color: string
}

export const Icon = styled<any>(Feather)<IconProps>`
  ${() => css`
    font-size: ${RFValue(20)}px;
  `}
`;