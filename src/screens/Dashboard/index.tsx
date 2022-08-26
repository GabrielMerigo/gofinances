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
  amountFormatted: string;
  lastTransaction?: string;
  amount: number;
}

type HighlightData = {
  entries?: HighlightProps;
  expensives?: HighlightProps;
  total?: HighlightProps
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const collectionKey = `@gofinances:transactions_user:${user!.id}`;

  function getLastTransactionDate(data: DataListProps[]) {
    const lastTransaction = new Date(
      Math.max.apply(Math, data
        .filter(transaction => transaction.type === 'up')
        .map(transaction => new Date(transaction.date).getTime())
      ))

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
  }

  async function loadTransactions() {
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

        const amountFormatted = Number(transaction.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });

        const date = transaction.date.includes('/')
          ? transaction.date
          : Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          }).format(new Date(transaction.date))

        return {
          id: transaction.id,
          title: transaction.title,
          amountFormatted,
          amount: transaction.amount,
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
        amountFormatted: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries.includes('NaN') ? 'Você não possui nenhuma entrada' : `Última entrada dia ${lastTransactionEntries}`,
        amount: entriesTotal
      },
      expensives: {
        amountFormatted: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpensives.includes('NaN') ? 'Você não possui nenhuma entrada' : `Última entrada dia ${lastTransactionExpensives}`,
        amount: expensiveTotal
      },
      total: {
        amountFormatted: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries.includes('NaN') ? 'Você não possui nenhuma entrada' : totalInterval,
        amount: total
      }
    })
    setIsLoading(false)
  }

  async function handleDeleteTransaction(id: string) {
    const transactionsFiltered = transactions.filter(transaction => transaction.id !== id);
    const expensiveTotal = transactionsFiltered.reduce((acc: number, transaction: TransactionCardProps) => {
      if (transaction.type === 'down') {
        acc += Number(transaction.amount);
      }
      return acc;
    }, 0)

    const entriesTotal = transactionsFiltered.reduce((acc: number, transaction: TransactionCardProps) => {
      if (transaction.type === 'up') {
        acc += Number(transaction.amount);
      }
      return acc;
    }, 0);

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      expensives: {
        ...highlightData.expensives,
        amountFormatted: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        amount: expensiveTotal
      },
      total: {
        ...highlightData.total,
        amountFormatted: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        amount: total
      },
      entries: {
        ...highlightData.entries,
        amountFormatted: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        amount: entriesTotal,
      }
    })

    setTransactions(transactionsFiltered);
    await AsyncStorage.setItem(collectionKey, JSON.stringify(transactionsFiltered));
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
              <HighlightCard type="up" title="Entries" amount={highlightData!.entries!.amountFormatted} lastTransaction={highlightData!.entries!.lastTransaction} />
              <HighlightCard type="down" title="Outcomes" amount={highlightData!.expensives!.amountFormatted} lastTransaction={highlightData!.expensives!.lastTransaction} />
              <HighlightCard type="total" title="Total" amount={highlightData!.total!.amountFormatted} lastTransaction={highlightData!.total!.lastTransaction} />
            </S.HighlightCards>

            <S.Transaction>
              <S.Title>Dashboard</S.Title>

              <S.TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                  <TransactionCard
                    handleDelete={() => handleDeleteTransaction(item.id)}
                    data={item}
                  />
                }
              />
            </S.Transaction>
          </>
        )
      }
    </S.Container>
  )
}