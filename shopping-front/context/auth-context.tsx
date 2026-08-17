"use client";

import { createContext, type PropsWithChildren } from "react";

export const AuthContext = createContext<boolean>(false);

export function AuthProvider({
  value,
  children,
}: PropsWithChildren<{ value: boolean }>) {
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}