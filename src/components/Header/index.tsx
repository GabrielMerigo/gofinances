import useAuth from '../../hooks/auth';
import * as S from './styles'

export function Header() {
  const { signOut, user } = useAuth();

  return (
    <S.Header>
      <S.UserWrapper>
        <S.UserInfo>
          <S.Photo
            source={{ uri: user?.photo }}
          />
          <S.User>
            <S.UserGreeting>Olá, </S.UserGreeting>
            <S.UserName>{user?.name}</S.UserName>
          </S.User>
        </S.UserInfo>
        <S.LogoutButton onPress={signOut}>
          <S.Icon name="power" />
        </S.LogoutButton>
      </S.UserWrapper>
    </S.Header>
  )
}