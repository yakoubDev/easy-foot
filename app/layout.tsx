// layout.tsx
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight : ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Easy Foot",
  description: "Find your next football match!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans`}>
        <div className="flex">
          <AuthProvider>
            <Nav />
            <div className="min-h-screen flex items-center justify-center w-full ml-0 mt-20 mb-12 lg:my-6  lg:ml-64">
              {children}
            </div>
          </AuthProvider>
          <Toaster
          position="bottom-right"
          theme="dark"
          duration={2000}
        />
        </div>
      </body>
    </html>
  );
}
