import React, { useContext } from "react";
import { AuthProvider } from "../context/AuthContext";


export function useAuth() {
  const context = useContext(AuthProvider);

  async function signWithGoogle() {
    try {
      const CLIENT_ID = '';
      const REDIRECT_URL = '';
      const RESPONSE_TYPE = '';
      const SCOPE = '';

      const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    } catch (err) {
      throw new Error('');
    }
  }

  return context
}