import React, { useContext } from "react";
import { AuthProvider } from "../context/AuthContext";



export default function useAuth() {
  const context = useContext(AuthProvider);

  return context
}