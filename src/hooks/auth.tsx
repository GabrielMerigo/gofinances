import React, { useContext } from "react";
import { AuthProvider } from "../context/AuthContext";



export function useAuth() {
  const context = useContext(AuthProvider);

  return context
}