import * as S from './styles'

type HeadingProps = {
  children: string;
}

export function Heading({ children }: HeadingProps) {
  return (
    <S.Header>
      <S.Title>{children}</S.Title>
    </S.Header>
  )
}