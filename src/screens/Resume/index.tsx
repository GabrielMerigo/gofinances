import React, { useEffect, useState } from 'react';
import { Heading } from '../../components/Heading';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as S from './styles'

import { TransactionCardProps } from "../../components/TransactionCard";
import { categories } from '../../utils/categories';


type TotalByCategoryProps = {
  name: string,
  total: string,
  color: string
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<TotalByCategoryProps[]>([]);

  async function loadData() {
    const collectionKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted: TransactionCardProps[] = response ? JSON.parse(response) : [];
    const expensives = responseFormatted.filter(expensive => expensive.type === 'down');
    const totalByCategory: TotalByCategoryProps[] = [];

    categories.forEach((category, index) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionCardProps) => {
        if (String(expensive.category.name) === category.name) {
          categorySum += Number(expensive.amount)
        }
      })


      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        totalByCategory.push({
          name: category.name,
          color: category.color,
          total,
        });
      }

    })

    setTotalByCategories(totalByCategory)
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <S.Container>
      <Heading children="Resume per category" />

      <S.Content>
        {totalByCategories.map((category, index) => (
          <HistoryCard
            key={index}
            amount={category.total}
            title={category.name}
            color={category.color}
          />
        ))}
      </S.Content>

    </S.Container>
  )
}