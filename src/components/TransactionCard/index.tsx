import React from "react";

import * as S from './styles';

type Category = {
  name: string;
  icon: string;
}

export type TransactionCardProps = {
  type: 'up' | 'down'
  title: string;
  amount: number | string;
  category: Category;
  date: string;
}

type Props = {
  data: TransactionCardProps;
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

export function TransactionCard({ data }: Props) {
  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>
      <S.Amount type={data.type}>
        {data.type === 'down' && '- '}
        {data.amount}
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