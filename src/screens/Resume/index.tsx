import React, { useEffect, useState } from 'react';
import { Heading } from '../../components/Heading';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as S from './styles'

import { TransactionCardProps } from "../../components/TransactionCard";
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/theme/theme';


type TotalByCategoryProps = {
  name: string,
  totalFomatted: string,
  total: number,
  color: string,
  percent: string
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<TotalByCategoryProps[]>([]);

  async function loadData() {
    const collectionKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted: TransactionCardProps[] = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(expensive => expensive.type === 'down');
    const totalByCategory: TotalByCategoryProps[] = [];
    const expensivesTotal = expensives.reduce((acc: number, expansive: TransactionCardProps) => {
      return acc += Number(expansive.amount)
    }, 0)

    categories.forEach((category, index) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionCardProps) => {
        if (String(expensive.category.name) === category.name) {
          categorySum += Number(expensive.amount)
        }
      })

      const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        totalByCategory.push({
          name: category.name,
          color: category.color,
          totalFomatted: total,
          total: categorySum,
          percent
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
        <S.ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            x="percent"
            y="total"
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
            labelRadius={80}
          />
        </S.ChartContainer>

        {totalByCategories.map((category, index) => (
          <HistoryCard
            key={index}
            amount={category.totalFomatted}
            title={category.name}
            color={category.color}
          />
        ))}
      </S.Content>

    </S.Container>
  )
}