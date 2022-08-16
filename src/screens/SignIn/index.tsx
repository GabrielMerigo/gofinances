import React from 'react';
import * as S from './styles'
import LogoSvg from '../../assets/logo.svg'
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import { Alert } from 'react-native';

export function SignIn() {
  const { user, signWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signWithGoogle();

    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possível conenctar a conta google');
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <S.Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </S.SignInTitle>

      </S.Header>
      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            title="Entrar com Google"
            svg={GoogleSvg}
          />
          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
          />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
}