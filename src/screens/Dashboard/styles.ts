import styled, { css } from "styled-components/native";
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 24 }
})`
  width: 100%;

  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transaction = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(18)}px;
    font-family: ${theme.fonts.regular};
    margin-bottom: 16px;
  `}
`;

export const TransactionList = styled.FlatList`
  ${({ theme }) => css``}
`;