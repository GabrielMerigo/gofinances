import React, { createContext } from 'react';
import * as AuthSession from 'expo-auth-session';

type AuthProviderProps = {
  user: {
    id: string;
    name: string;
    email: string;
    photo?: string;
  };
  signWithGoogle: () => Promise<void>;
}

export const AuthProvider = createContext({} as AuthProviderProps);

type AuthContextProviderProps = {
  children: React.ReactNode;
}

export function AuthContextProvider({ children, }: AuthContextProviderProps) {
  const user = {
    id: '123',
    name: 'Gabriel',
    email: 'gabriel.merigo.dev@gmail.com',
    photo: '123.jpg'
  }

  async function signWithGoogle() {
    try {
      const CLIENT_ID = '1016182735804-pdd69b7g7rk74rssbgh3blgmklimpl3e.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@gabrielmerigo/gofinances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const parameters = `client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${parameters}`; // Endpoint auth google

      const response = await AuthSession.startAsync({ authUrl });
      console.log(response)

    } catch (err) {
      throw new Error('');
    }
  }

  return (
    <AuthProvider.Provider value={{ user, signWithGoogle }}>
      {children}
    </AuthProvider.Provider>
  )
}