import React, { createContext } from 'react';

type AuthProviderProps = {
  user: {
    id: string;
    name: string;
    email: string;
    photo?: string;
  };
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

  return (
    <AuthProvider.Provider value={{ user }}>
      {children}
    </AuthProvider.Provider>
  )
}