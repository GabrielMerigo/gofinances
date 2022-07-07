import styled, { css, DefaultTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { HighlightCardProps } from './index'

type Props = Pick<HighlightCardProps, 'type'>

export const Container = styled.View<Props>`
  ${({ theme, type }) => css`
    background-color:  ${type === 'total' ? theme.colors.secondary : theme.colors.shape};

    width: ${RFValue(300)}px;
    border-radius: 5px;
    margin-right: 24px;

    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
  `}
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const iconModifiers = {
  up: (theme: DefaultTheme) => css`
    color: ${theme.colors.success};
  `,
  down: (theme: DefaultTheme) => css`
    color: ${theme.colors.attention};
  `,
  total: (theme: DefaultTheme) => css`
    color: ${theme.colors.shape};
  `,
}

export const Icon = styled<any>(Feather)<Props>`
  ${({ theme, type }) => css`
    font-size: ${RFValue(40)}px;

    ${type === 'down' && iconModifiers.down(theme)};
    ${type === 'up' && iconModifiers.up(theme)};
    ${type === 'total' && iconModifiers.total(theme)};
  `}
`;

export const Title = styled.Text<Props>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${type === 'total' ? theme.colors.shape : theme.colors.text_dark};
  `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<Props>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.medium};
    font-size: ${RFValue(32)}px;
    color: ${type === 'total' ? theme.colors.shape : theme.colors.text_dark};
    margin-top: 38px;
  `};
`;

export const LastTransaction = styled.Text<Props>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${type === 'total' ? theme.colors.shape : theme.colors.text_dark};
  `};
`;