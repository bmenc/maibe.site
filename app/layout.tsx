import "./globals.css";
import type { Metadata } from "next";
import ClientProvider from "./ClientProvider";

export const metadata: Metadata = {
  title: "Demo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
