import React, { useEffect, useState, useCallback } from "react";
import { Header } from "../../components/Header";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCardProps, TransactionCard } from "../../components/TransactionCard";
import * as S from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native'
import theme from "../../global/theme/theme";
import useAuth from "../../hooks/auth";


export interface DataListProps extends TransactionCardProps {
  id: string
}

type HighlightProps = {
  amount: string;
  lastTransaction?: string;
}

type HighlightData = {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  function getLastTransactionDate(data: DataListProps[]) {
    const lastTransaction = new Date(
      Math.max.apply(Math, data
        .filter(transaction => transaction.type === 'up')
        .map(transaction => new Date(transaction.date).getTime())
      ))

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
  }

  async function loadTransactions() {
    const collectionKey = `@gofinances:transactions_user:${user!.id}`;
    const response = await AsyncStorage.getItem(collectionKey);
    const data: DataListProps[] = response ? JSON.parse(response) : [];

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
    const lastTransactionEntries = getLastTransactionDate(data);
    const lastTransactionExpensives = getLastTransactionDate(data)
    const totalInterval = `01 a ${lastTransactionExpensives}`

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionExpensives}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })
    setIsLoading(false)
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
      {isLoading
        ? (
          <S.Loader>
            <ActivityIndicator color={theme.colors.primary} />
          </S.Loader>
        )
        : (
          <>
            <S.HighlightCards>
              <HighlightCard type="up" title="Entries" amount={highlightData.entries.amount} lastTransaction={highlightData.entries.lastTransaction} />
              <HighlightCard type="down" title="Outcomes" amount={highlightData.expensives.amount} lastTransaction={highlightData.expensives.lastTransaction} />
              <HighlightCard type="total" title="Total" amount={highlightData.total.amount} lastTransaction={highlightData.total.lastTransaction} />
            </S.HighlightCards>

            <S.Transaction>
              <S.Title>Dashboard</S.Title>

              <S.TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />
            </S.Transaction>
          </>
        )
      }
    </S.Container>
  )
}