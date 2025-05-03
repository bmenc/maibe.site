import "./globals.css";
import type { Metadata } from "next";
import StoreProvider from "@/store/storeProvider";

export const metadata: Metadata = {
  title: "Admin | Preproduction",
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
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
