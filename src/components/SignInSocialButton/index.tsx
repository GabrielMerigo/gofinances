import { SvgProps } from 'react-native-svg';
import { TouchableOpacityProps } from 'react-native';
import * as S from './styles'

type SignInSocialButtonProps = {
  title: string;
  svg: React.FC<SvgProps>
} & TouchableOpacityProps;

export function SignInSocialButton({ title, svg: Svg, ...rest }: SignInSocialButtonProps) {
  return (
    <S.Button {...rest}>
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>

      <S.Text>
        {title}
      </S.Text>
    </S.Button>
  );
}