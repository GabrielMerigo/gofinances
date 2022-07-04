import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};

    width: ${RFValue(300)}px;
    border-radius: 5px;
    margin-right: 24px;
    height: 300px;

    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
  `}
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Icon = styled<any>(Feather)`
  font-size: ${RFValue(40)}px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.text_dark};
  `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
    font-size: ${RFValue(32)}px;
    color: ${theme.colors.text_dark};
    margin-top: 38px;
  `};
`;

export const LastTransaction = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${theme.colors.text};
  `};
`;