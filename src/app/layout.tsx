import type { Metadata } from "next";
import "./globals.css";
import './styles/fonts.css';
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});


export const metadata: Metadata = {
  title: "Mabs",
  description: "Mabel Castillo's portfolio website.",
  keywords: "frontend, front-end, front, end, web, website, dev, developer, canada, freelance, next.js, react, typescript, tailwind, javascript, responsive, cms, git, github, bc, british, columbia, british columbia, coquitlam, burnaby, new westminster, new, westminster, surrey, vancouver, richmond, ecommerce, e-commerce, business ",
  authors: [{ name: "Mabel Castillo" }],
  icons: {
    icon: '/images/icon mabs.svg',
  },
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
