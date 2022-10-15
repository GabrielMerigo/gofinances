import React from 'react';
import { render } from '@testing-library/react-native';
import { Input } from '.'
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/theme/theme';

type ProvidersProps = {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe('<Input />', () => {
  it('teste', () => {
    render(<Input />, {
      wrapper: Providers
    })
  })
})