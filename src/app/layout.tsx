import type { Metadata } from "next";
import "./globals.css";
import './styles/fonts.css';
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'], // O cualquier otro conjunto de caracteres que necesites
  weight: ['400', '700'], // Selecciona los pesos que necesitas
});


export const metadata: Metadata = {
  title: "Mabs",
  description: "Mabel Castillo's portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} `}
      >
        {children}
      </body>
    </html>
  );
}
