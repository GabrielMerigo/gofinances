import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Header = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};

    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
    color: ${theme.colors.shape};

    font-size: ${RFValue(18)}px;
  `}
`;
