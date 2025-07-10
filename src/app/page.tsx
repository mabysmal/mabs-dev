import React from "react";
import Script from 'next/script';
import HomeClient from "./components/home-client";
import './globals.css';

export default function Home() {
  return (
    <>
      <head>
      <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-55733BR8EZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-55733BR8EZ');
          `}
        </Script>
      </head>

      <main className=''>
        <HomeClient />
      </main>
    </>
  );
}