import { RFValue } from "react-native-responsive-fontsize";
import styled, { css, DefaultTheme } from "styled-components/native";
import { Feather } from '@expo/vector-icons';

type CategoryProps = {
  isActive: boolean
}

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: ${RFValue(113)}px;

    background-color: ${theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    padding-top: 19px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.shape};
    font-size: ${RFValue(18)}px;
    margin-bottom: 16px;
  `}
`;

const categoryModifiers = {
  isActive: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.secondary_light};
  `
}

export const Category = styled.TouchableOpacity<CategoryProps>`
  ${({ isActive, theme }) => css`
    width: 100%;
    padding: ${RFValue(15)}px;

    flex-direction: row;  
    align-items: center;
    background-color: ${theme.colors.background};

    ${isActive &&  categoryModifiers.isActive(theme)};
  `}
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`;  

export const Name = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(14)}px;
  `}
`

export const Divider = styled.View`
  ${({ theme }) => css`
    height: 1px;
    width: 100%;
    background-color: ${theme.colors.text_dark};
  `}
`


export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`