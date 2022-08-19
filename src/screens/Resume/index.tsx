import React, { useState, useCallback, useEffect } from 'react';
import { Heading } from '../../components/Heading';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMonths, subMonths, format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native'
import * as S from './styles'

import { TransactionCardProps } from "../../components/TransactionCard";
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/theme/theme';
import { ActivityIndicator } from 'react-native';

export type TotalByCategoryProps = {
  name: string,
  totalFomatted: string,
  total: number,
  color: string,
  percent: string
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<TotalByCategoryProps[]>([]);

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadData() {
    setIsLoading(false);
    const collectionKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted: TransactionCardProps[] = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(expensive =>
      expensive.type === 'down' &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );


    const totalByCategory: TotalByCategoryProps[] = [];
    const expensivesTotal = expensives.reduce((acc: number, expansive: TransactionCardProps) => {
      return acc += Number(expansive.amount)
    }, 0)

    categories.forEach((category) => {
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
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]));

  return (
    <S.Container>
      <Heading children="Resume per category" />

      {isLoading ? (
        <S.Loader>
          <ActivityIndicator size={50} color={theme.colors.primary} />
        </S.Loader>
      ) : (
        <>

          <S.Content>
            <S.MonthSelect>
              <S.MonthSelectButton onPress={() => handleDateChange('prev')}>
                <S.MonthSelectIcon name="chevron-left" />
              </S.MonthSelectButton>

              <S.Month>
                {format(selectedDate, 'MMMM, yyyy')}
              </S.Month>

              <S.MonthSelectButton onPress={() => handleDateChange('next')}>
                <S.MonthSelectIcon name="chevron-right" />
              </S.MonthSelectButton>
            </S.MonthSelect>


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

            <S.HistoryCardsList
              data={totalByCategories}
              keyExtractor={(item) => item.totalFomatted}
              renderItem={({ item }) =>
                <HistoryCard
                  key={item.percent}
                  amount={item.totalFomatted}
                  title={item.name}
                  color={item.color}
                />}
            />
          </S.Content>
        </>
      )}
    </S.Container>
  )
}