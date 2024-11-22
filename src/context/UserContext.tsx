"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminType {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: AdminType | null;
  setUser: React.Dispatch<React.SetStateAction<AdminType | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminType | null>(null);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("authToken");
    if (savedUserInfo) {
      setUser(JSON.parse(savedUserInfo));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("authToken", JSON.stringify(user));
    } else {
      localStorage.removeItem("authToken");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Must Be Used Within An UserProvider!");
  }
  return context;
};
