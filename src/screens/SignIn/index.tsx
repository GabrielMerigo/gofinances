import React, { useState } from 'react';
import * as S from './styles'
import LogoSvg from '../../assets/logo.svg'
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components';

export function SignIn() {
  const theme = useTheme();
  const { user, signWithGoogle, signWithApple } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      await signWithGoogle();
    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possível conenctar a conta google');
    } finally {
      setIsLoading(true);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      await signWithApple();
    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possível conenctar a conta Apple');
    } finally {
      setIsLoading(true);
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
            onPress={handleSignInWithApple}
            title="Entrar com Apple"
            svg={AppleSvg}
          />
        </S.FooterWrapper>

        {isLoading &&
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        }
      </S.Footer>
    </S.Container>
  );
}