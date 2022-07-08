import React from "react";
import { Header } from "../../components/Header";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCardProps, TransactionCard } from "../../components/TransactionCard";
import * as S from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      title: "Desenvolvimento de site",
      type: 'positive',
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/12/2020"
    },
    {
      id: '2',
      title: "Conta de luz",
      amount: "R$ 590,00",
      type: 'negative',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/12/2020"
    },
    {
      id: '3',
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      type: 'positive',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: "10/12/2020"
    },
    {
      id: '4',
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      type: 'positive',
      category: {
        name: 'Casa',
        icon: 'shopping-bag'
      },
      date: "10/12/2020"
    },
  ];

  return (
    <S.Container>
      <Header />
      <S.HighlightCards>
        <HighlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransaction="17 de abril de 2021" />
        <HighlightCard type="down" title="Saídas" amount="R$ 12.500,00" lastTransaction="28 de outubro de 2022" />
        <HighlightCard type="total" title="Total" amount="R$ 5.000,00" lastTransaction="01 à 16 de abril" />
      </S.HighlightCards>

      <S.Transaction>
        <S.Title>Listagem</S.Title>

        <S.TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </S.Transaction>
    </S.Container>
  )
}