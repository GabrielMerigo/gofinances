import { TouchableOpacity } from "react-native";
import styled, { css, DefaultTheme } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

type ContainerProps = {
  isActive: boolean,
  type: 'down' | 'up'
}

const containerModifiers = {
  down: (theme: DefaultTheme) => css`
    background: ${theme.colors.attention_light};
    border: 0;
  `,
  up: (theme: DefaultTheme) => css`
    background: ${theme.colors.success_light};
    border: 0;
  `,
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  ${({ theme, isActive, type }) => css`
    width: 48%;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 1.5px solid #ccc;
    border-radius: 5px;
    
    padding: 16px;
    ${isActive && type === 'up' && containerModifiers.up(theme)}
    ${isActive && type === 'down' && containerModifiers.down(theme)}
  `}
`;

type IconProps = {
  type: 'up' | 'down'
}

export const Icon = styled(Feather)<IconProps>`
  ${({ theme, type }) => css`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${type === 'up' ? theme.colors.success : theme.colors.attention};
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.regular};
  `}
`;