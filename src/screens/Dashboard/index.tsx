import React from "react";
import * as S from './styles'
import { Feather } from '@expo/vector-icons';


export function Dashboard() {
  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.Photo
              source={{ uri: 'https://avatars.githubusercontent.com/u/72055874?v=4' }}
            />
            <S.User>
              <S.UserGreeting>Olá, </S.UserGreeting>
              <S.UserName>Gabriel</S.UserName>
            </S.User>
          </S.UserInfo>
          <S.Icon name="power" />
        </S.UserWrapper>
      </S.Header>

    </S.Container>
  )
}