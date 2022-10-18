import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/theme/theme';
import { Register } from '../../screens/Register';

type ProvidersProps = {
  children: React.ReactNode;
}

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn()
  }
})

const Providers = ({ children }: ProvidersProps) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: async () => { }
}))

describe('Register Screen', () => {
  it('should be open category modal when user click on button', () => {
    render(
      <Register />,
      {
        wrapper: Providers
      }
    )

    const categoryModal = screen.getByTestId('modal-ID');
    const buttonCategory = screen.getByTestId('button-category');
    fireEvent.press(buttonCategory);

    expect(categoryModal.props.visible).toBeTruthy();
  })
})