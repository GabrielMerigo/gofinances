import React from "react";
import * as S from './styles';
import { TouchableOpacityProps } from "react-native";

type CategorySelectProps = {
  title: string;
  onPress: () => void;
} & TouchableOpacityProps;

export function CategorySelectButton({ title, onPress, testID }: CategorySelectProps) {
  return (
    <S.Container testID={testID} onPress={onPress} >
      <S.Category>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  )
}