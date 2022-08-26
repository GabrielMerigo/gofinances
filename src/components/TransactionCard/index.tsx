import React from "react";
import { TouchableOpacity } from "react-native";

import * as S from './styles';

type Category = {
  name: string;
  icon: string;
}

export type TransactionCardProps = {
  id: string;
  type: 'up' | 'down'
  title: string;
  amountFormatted: string;
  amount: number;
  category: Category;
  date: string;
}

type Props = {
  data: TransactionCardProps;
  handleDelete: (id: string) => void;
}

type Icons = {
  purchases: string;
  food: string;
  salary: string;
  car: string;
  leisure: string;
  studies: string;
}

const icons: Icons = {
  purchases: 'shopping-bag',
  food: 'coffee',
  salary: 'dollar-sign',
  car: 'crosshair',
  leisure: 'heart',
  studies: 'book'
}

export function TransactionCard({ data, handleDelete }: Props) {

  return (
    <S.Container>
      <S.Header>
        <S.Title>{data.title}</S.Title>
        <TouchableOpacity onPress={() => handleDelete(data.id)}>
          <S.IconToRemove name="x"></S.IconToRemove>
        </TouchableOpacity>
      </S.Header>
      <S.Amount type={data.type}>
        {data.type === 'down' && '- '}
        {data.amountFormatted}
      </S.Amount>
      <S.Footer>
        <S.Category>
          <S.Icon name={icons[data.category.icon as keyof Icons]} />
          <S.CategoryName>
            {data.category.name}
          </S.CategoryName>
        </S.Category>
        <S.Date>{data.date}</S.Date>
      </S.Footer>
    </S.Container>
  )
}