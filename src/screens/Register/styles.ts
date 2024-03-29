import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background};
  `}
`;

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

export const Form = styled.View`
  flex: 1;
  width: 100%; 
  padding: 24px;
  justify-content: space-between;
`;


export const Fields = styled.View``;
export const TransactionTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin: 20px 0;
`;