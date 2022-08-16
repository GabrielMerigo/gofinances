import React, { createContext } from 'react';

type AuthProviderProps = {
  username?: string;
}

export const AuthProvider = createContext({} as AuthProviderProps);

type AuthContextProviderProps = {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthProvider.Provider value={{}}>
      {children}
    </AuthProvider.Provider>
  )
}