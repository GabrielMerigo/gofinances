import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCardProps, TransactionCard } from "../../components/TransactionCard";
import * as S from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DataListProps extends TransactionCardProps {
  id: string
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransactions() {
    const collectionKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(collectionKey);
    const transactions = response ? JSON.parse(response) : [];
    const transactionFormatted: DataListProps[] = transactions
      .map((transaction: DataListProps) => {
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

      console.log(transactionFormatted)
      setData(transactionFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, [])

  return (
    <S.Container>
      <Header />
      <S.HighlightCards>
        <HighlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransaction="17 de abril de 2021" />
        <HighlightCard type="down" title="Saídas" amount="R$ 12.500,00" lastTransaction="28 de outubro de 2022" />
        <HighlightCard type="total" title="Total" amount="R$ 5.000,00" lastTransaction="01 à 16 de abril" />
      </S.HighlightCards>

      <S.Transaction>
        <S.Title>Dashboard</S.Title>

        <S.TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </S.Transaction>
    </S.Container>
  )
}