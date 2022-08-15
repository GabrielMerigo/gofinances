import styled, { css } from "styled-components/native";
import { FlatList, FlatListProps } from 'react-native';
import { TotalByCategoryProps } from ".";
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background};
  `}
`;

export const Content = styled.View`
  padding: 24px;
  flex: 1;
`;
// 9690A8016184A6DA

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const HistoryCardsList = styled(
  FlatList as new (props: FlatListProps<TotalByCategoryProps>) => FlatList<TotalByCategoryProps>)
  .attrs({
    showsVerticalScrollIndicator: false
  })`
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

export const MonthSelectButton = styled.TouchableOpacity`
`;

export const MonthSelectIcon = styled<any>(Feather)`
  font-size: ${RFValue(20)}px;
`;

export const Month = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(24)}px;
  `}
`;

export const Loader = styled.View`
  ${({ theme }) => css`
    flex: 1;
    justify-content: center;
    align-items: center;
    font-family: ${theme.fonts.regular};
  `}
`;