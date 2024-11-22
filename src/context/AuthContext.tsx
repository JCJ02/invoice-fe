"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Admin {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: Admin | null;
  setUser: React.Dispatch<React.SetStateAction<Admin | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Admin | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() Must Be Used Within An AuthProvider!");
  }
  return context;
};
