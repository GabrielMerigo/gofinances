import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import AppLoading from 'expo-app-loading';
import theme from './src/global/theme/theme';
import { Routes } from './src/routes';
import { AuthContextProvider } from './src/context/AuthContext';
import useAuth from './src/hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { storageLoading } = useAuth();

  if (!fontsLoaded || storageLoading) {
    return <AppLoading />;
  }

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AuthContextProvider>
  );
}