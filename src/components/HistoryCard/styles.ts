import styled, { css } from "styled-components/native";
import { HistoryCardProps } from ".";

type ContainerProps = Pick<HistoryCardProps, 'color'>

export const Container = styled.View<ContainerProps>`
  ${({ theme, color }) => css`
    width: 100%;
    background-color:${theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;

    padding: 13px 24px;

    border-radius: 5px;
    border-left-width: 4px;
    border-left-color: ${color};
    margin-bottom: 10px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
  `}
`;

export const Amount = styled.Text`
   ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
  `}
`;