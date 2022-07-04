import React from "react";
import { Header } from "../../components/Header";
import { HighlightCard } from "../../components/HighlightCard";
import * as S from './styles'

export function Dashboard() {
  return (
    <S.Container>
      <Header />
      <S.HighlightCards>
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />

      </S.HighlightCards>
    </S.Container>
  )
}