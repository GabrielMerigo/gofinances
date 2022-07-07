import React from "react";
import { Header } from "../../components/Header";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import * as S from './styles'

export function Dashboard() {
  const data = [
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/12/2020"
    },
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/12/2020"
    },
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/12/2020"
    },
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/12/2020"
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
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
        />

      </S.Transaction>
    </S.Container>
  )
}