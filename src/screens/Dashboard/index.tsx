import React, { useEffect, useState, useCallback } from "react";
import { Header } from "../../components/Header";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCardProps, TransactionCard } from "../../components/TransactionCard";
import * as S from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'

export interface DataListProps extends TransactionCardProps {
  id: string
}

type HighlightProps = {
  amount: string
}

type HighlightData = {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  async function loadTransactions() {
    const collectionKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(collectionKey);
    const data = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionFormatted: DataListProps[] = data
      .map((transaction: DataListProps) => {

        if (transaction.type === 'up') {
          entriesTotal += Number(transaction.amount);
        } else {
          expensiveTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(transaction.date))

        return {
          id: transaction.id,
          title: transaction.title,
          amount,
          type: transaction.type,
          category: transaction.category,
          date
        }
      })

    setTransactions(transactionFormatted);

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })

  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <S.Container>
      <Header />
      <S.HighlightCards>
        <HighlightCard type="up" title="Entradas" amount={highlightData.entries.amount} lastTransaction="17 de abril de 2021" />
        <HighlightCard type="down" title="Saídas" amount={highlightData.expensives.amount} lastTransaction="28 de outubro de 2022" />
        <HighlightCard type="total" title="Total" amount={highlightData.total.amount} lastTransaction="01 à 16 de abril" />
      </S.HighlightCards>

      <S.Transaction>
        <S.Title>Dashboard</S.Title>

        <S.TransactionList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </S.Transaction>
    </S.Container>
  )
}