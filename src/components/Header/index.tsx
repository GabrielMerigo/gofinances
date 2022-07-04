import * as S from './styles'

export function Header() {
  return (
    <S.Header >
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
    </S.Header >
  )
}