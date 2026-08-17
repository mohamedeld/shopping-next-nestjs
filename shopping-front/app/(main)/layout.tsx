import Header from "@/components/Header";
import { AuthProvider } from "@/context/auth-context";
import authenticated from "@/server/authenticated";
import { PropsWithChildren } from "react";

export default async function MainLayout({ children }: PropsWithChildren) {
  const isAuthenticated = await authenticated();
  return (
    <div>
      <AuthProvider value={isAuthenticated}>
        <Header />
        <main className="w-full h-full">{children}</main>
      </AuthProvider>
    </div>
  );
}
