import styled, { css, DefaultTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  ${({ theme }) => css`
    background: ${theme.colors.shape};
    border-radius: 5px;

    padding: 17px 24px;
    margin-bottom: 16px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.regular};
  `}
`;

export const Amount = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(20)}px;
    margin-top: 2px;
    font-family: ${theme.fonts.regular};
  `}
`;

export const Footer = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 19px;
  `}
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled<any>(Feather)`
  ${({ theme }) => css`
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.text};
  `}
`;

export const CategoryName = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.text};

    margin-left: 17px;
  `}
`;

export const Date = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.text};
  `}
`;
