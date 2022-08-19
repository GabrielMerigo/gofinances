import React, { createContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { useQuery } from '@tanstack/react-query'

import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

type User = {
  email: string
  id: string,
  name: string,
  photo: string | undefined,
}

type AuthProviderProps = {
  user: User | undefined;
  signWithGoogle: () => Promise<void>;
  signWithApple: () => Promise<void>;
}

export const AuthProvider = createContext({} as AuthProviderProps);

type AuthContextProviderProps = {
  children: React.ReactNode;
}

type AuthResponse = {
  params: {
    access_token: string;
  },
  type: string;
}


export function AuthContextProvider({ children, }: AuthContextProviderProps) {
  const [user, setUser] = useState({} as User);
  const userKey = '@gofinances:user';

  // TODO: USAR UseQuery para evitar criação de hook desncessário

  async function loadUserStorageData() {
    const userStoraged = await AsyncStorage.getItem(userKey);

    if (userStoraged) {
      const userLogged = JSON.parse(userStoraged) as User;
      setUser(userLogged);
    }
  }

  useEffect(() => {
    console.log('montou');
    loadUserStorageData();
  }, []);

  async function signWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const parameters = `client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${parameters}`; // Endpoint auth google

      const { params, type } = await AuthSession.startAsync({ authUrl }) as AuthResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const useInfo = await response.json();

        setUser({
          email: useInfo.email,
          id: useInfo.id,
          name: useInfo.given_name,
          photo: useInfo.picture
        });

        AsyncStorage.setItem(userKey, JSON.stringify(user));
      }

    } catch (err) {
      throw new Error('');
    }
  }

  async function signWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: String(credential!.email),
          name: String(credential!.fullName!.givenName),
          photo: undefined
        }

        setUser(userLogged);
        AsyncStorage.setItem(userKey, JSON.stringify(user));
      }


    } catch (err) {
      throw new Error();
    }
  }

  return (
    <AuthProvider.Provider value={{ user, signWithGoogle, signWithApple }}>
      {children}
    </AuthProvider.Provider>
  )
}