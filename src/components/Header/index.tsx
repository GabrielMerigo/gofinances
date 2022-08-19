import useAuth from '../../hooks/auth';
import * as S from './styles'

export function Header() {
  const { signOut } = useAuth();

  return (
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
        <S.LogoutButton onPress={signOut}>
          <S.Icon name="power" />
        </S.LogoutButton>
      </S.UserWrapper>
    </S.Header>
  )
}