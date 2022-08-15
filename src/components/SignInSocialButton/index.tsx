import { SvgProps } from 'react-native-svg';
import * as S from './styles'

type SignInSocialButtonProps = {
  title: string;
  svg: React.FC<SvgProps>
}

export function SignInSocialButton({ title, svg: Svg, ...rest }: SignInSocialButtonProps) {
  return (
    <S.Button>
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>

      <S.Text>
        {title}
      </S.Text>
    </S.Button>
  );
}