import "@/styles/globals.css";
import { Metadata } from "next";
import Header from "@/components/header/page";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "TecEduca",
  description: "Busca e cadastro de alunos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="pt-br">
      <body className="w-screen h-screen bg-stone-200">
          <Providers themeProps={{ attribute: "class", defaultTheme: "ligth" }}>
            <Header />
            {children}
          </Providers>
      </body>
    </html>
  );
}
